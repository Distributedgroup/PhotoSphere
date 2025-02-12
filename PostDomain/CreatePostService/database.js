const mysql = require('mysql2/promise');

// 🔹 Configuración de conexión a MySQL
const MYSQL_CONFIG = {
    host: "54.226.242.133",
    user: "root",
    password: "claveSegura@123",
    database: "socialUF",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// 🔹 Crear conexión a MySQL
let mysqlPool;

async function getMySQLPool() {
    if (!mysqlPool) {
        mysqlPool = await mysql.createPool(MYSQL_CONFIG);
        console.log("✅ Conectado a MySQL en `database.js`");
    }
    return mysqlPool;
}

// Exportamos la función en lugar de la variable directamente
module.exports = { getMySQLPool };
