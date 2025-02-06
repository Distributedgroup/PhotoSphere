require('dotenv').config(); // Load environment variables
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");

var app = express(); // 
const port = process.env.PORT || 5052;

const userRoutes = require('./routes/loginUser'); 
app.use(express.json());  
app.use("/api", userRoutes); 

// Setting up Server with Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log('✅ Socket conectado');

    socket.on('send-invitacion', function (data) {
        io.emit('new-invitacion', data);
    });

    socket.on('set-invitacion', function (data) {
        io.emit('set-new-invitacion', data);
    });

    socket.on('on-notifacion', function (data) {
        io.emit('emit-notifacion', data);
    });
});

// Connect to MongoDB in Docker on EC2
const MONGO_URI = process.env.MONGO_URI || "mongodb://52.1.158.25:27017/userservice";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        console.error("❌ Error connecting to MongoDB:", err);
    } else {
        httpServer.listen(port, function () {
            console.log("✅ Server running on port " + port);
            console.log("✅ Connected to MongoDB in Docker on EC2");
        });
    }
});

// Configure Middleware
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

// Configure CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

module.exports = app;
