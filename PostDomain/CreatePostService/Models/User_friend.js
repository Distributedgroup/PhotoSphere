const { mysqlPool } = require('../app'); // Importar conexión a MySQL

// Crear tabla si no existe
(async () => {
    try {
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
        console.log("✅ Tabla user_friend verificada en MySQL");
    } catch (error) {
        console.error("❌ Error al verificar la tabla user_friend:", error);
    }
})();

// Función para agregar una amistad
const addFriend = async (user_origin, user_friend) => {
    try {
        const [result] = await mysqlPool.query(
            "INSERT INTO user_friend (user_origin, user_friend) VALUES (?, ?)",
            [user_origin, user_friend]
        );
        return result;
    } catch (error) {
        console.error("❌ Error agregando amigo:", error);
        throw error;
    }
};

// Función para obtener amigos de un usuario
const getFriends = async (userId) => {
    try {
        const [rows] = await mysqlPool.query(
            "SELECT user_friend FROM user_friend WHERE user_origin = ?",
            [userId]
        );
        return rows;
    } catch (error) {
        console.error("❌ Error obteniendo amigos:", error);
        throw error;
    }
};

module.exports = { addFriend, getFriends };
