require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const bcrypt = require("bcrypt");

var app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));
app.use(express.json());

// Configure CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

// **Connecting to MongoDB in Docker inside EC2**
const MONGO_URI = process.env.MONGO_URI || "MONGO_URI=mongodb://52.1.158.25:27017/userservice";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ CreateUserService connected to MongoDB on EC2");

        // **Start Server only after connecting to database**
        httpServer.listen(port, function () {
            console.log("✅ CreateUserService running on port " + port);
        });
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });

// **Setting up Server with Socket.io**
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("✅ Socket connected in CreateUserService");
});

// Import the user model
const User = require("./Model/User");

// **Create user in MongoDB with email validation and password encryption**
app.post("/api/users", async (req, res) => {
    try {
        const { names, surnames, email, password, profession, description } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Encrypt the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            names,
            surnames,
            email,
            password: hashedPassword, // Save encrypted password
            profession,
            description
        });

        await newUser.save();
        console.log("✅ User created:", newUser);

        // **Notify `UpdateUserService`**
        try {
            const response = await axios.post("http://localhost:5051/api/notify", { userId: newUser._id });
            console.log("🔔 Notification sent to UpdateUserService:", response.data);
        } catch (error) {
            console.error("❌ Error sending notification to UpdateUserService:", error.response ? error.response.data : error.message);
        }

        res.status(201).json({ message: "User created", data: newUser });
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = app;
