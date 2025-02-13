const mysql = require('mysql2/promise');

// 🔹 Configuración de conexión a MySQL
const MYSQL_CONFIG = {
    host: "54.226.242.133",
    user: "admin",
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
        try {
            mysqlPool = await mysql.createPool(MYSQL_CONFIG);
            console.log("✅ Conectado a MySQL en `database.js`");
        } catch (error) {
            console.error("❌ Error al conectar a MySQL:", error);
        }
    }
    return mysqlPool;
}

// Exportamos la función en lugar de la variable directamente
module.exports = { getMySQLPool };
