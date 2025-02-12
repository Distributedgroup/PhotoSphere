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

// 🔹 Crear conexión a MySQL y asegurarse de que esté lista antes de exportarla
let mysqlPool = null;

async function initMySQL() {
    try {
        mysqlPool = await mysql.createPool(MYSQL_CONFIG);
        console.log("✅ Conectado a MySQL en `database.js`");
    } catch (error) {
        console.error("❌ Error conectando a MySQL en `database.js`:", error);
    }
}

initMySQL();

module.exports = { mysqlPool };
