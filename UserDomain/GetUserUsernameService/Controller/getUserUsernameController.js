const User = require('../Model/User');
const { getMySQLPool } = require('../database');

const get_user_username = async function (req, res) {
    if (req.user) {
        try {
            let username = req.params['username'];
            
            console.log("🔍 Buscando usuario con username:", username);
            let users = await User.find({ username: username });
            console.log("🔍 Resultado de la búsqueda en MongoDB:", users);

            if (users.length >= 1) {
                const userId = users[0]._id.toString(); // Asegurar que el _id se usa correctamente
                
                console.log("🔍 ID del usuario encontrado:", userId);
                
                const mysqlPool = await getMySQLPool();
                const connection = await mysqlPool.getConnection();
                const [friends] = await connection.query(
                    "SELECT COUNT(*) AS n_friends FROM user_friend WHERE user_origin = ?",
                    [userId] // Si MySQL usa INT, convertir a parseInt(userId, 10)
                );
                connection.release();
                
                console.log("🔍 Resultado de la consulta en MySQL:", friends);
                
                res.status(200).send({ data: users[0], n_friends: friends[0]?.n_friends || 0 });
            } else {
                res.status(200).send({ data: undefined });
            }
        } catch (error) {
            console.error("❌ Error en get_user_username:", error);
            res.status(500).send({ message: 'Error en el servidor' });
        }
    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
};


module.exports = { get_user_username };
