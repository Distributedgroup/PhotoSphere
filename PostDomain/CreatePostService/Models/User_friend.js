const { getMySQLPool } = require('../database'); // Importamos la función para obtener MySQL

async function setupUserFriendTable() {
    try {
        const mysqlPool = await getMySQLPool();
        const connection = await mysqlPool.getConnection();
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_friend (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_origin INT NOT NULL,
                user_friend INT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_origin) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (user_friend) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        connection.release();
        console.log("✅ Tabla `user_friend` verificada en MySQL");
    } catch (error) {
        console.error("❌ Error al verificar la tabla `user_friend`:", error);
    }
}

// Ejecutamos la función para asegurarnos de que la tabla existe
setupUserFriendTable();

// 🔹 Función para agregar una amistad
const addFriend = async (user_origin, user_friend) => {
    try {
        const mysqlPool = await getMySQLPool();
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(
            "INSERT INTO user_friend (user_origin, user_friend) VALUES (?, ?)",
            [user_origin, user_friend]
        );
        connection.release();
        return result;
    } catch (error) {
        console.error("❌ Error agregando amigo:", error);
        throw error;
    }
};

// 🔹 Función para obtener amigos de un usuario
const getFriends = async (userId) => {
    try {
        const mysqlPool = await getMySQLPool();
        const connection = await mysqlPool.getConnection();
        const [rows] = await connection.query(
            "SELECT user_friend FROM user_friend WHERE user_origin = ?",
            [userId]
        );
        connection.release();
        return rows;
    } catch (error) {
        console.error("❌ Error obteniendo amigos:", error);
        throw error;
    }
};

module.exports = { addFriend, getFriends };
