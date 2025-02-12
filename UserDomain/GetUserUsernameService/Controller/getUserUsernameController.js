const User = require('../Model/User');
const { getMySQLPool } = require('../database');

const get_user_username = async function (req, res) {
    if (req.user) {
        try {
            let username = req.params['username'];
            
            // Buscar usuario en MongoDB
            let users = await User.find({ username: username });
            
            if (users.length >= 1) {
                const userId = users[0]._id;
                
                // Buscar amigos en MySQL
                const mysqlPool = await getMySQLPool();
                const connection = await mysqlPool.getConnection();
                const [friends] = await connection.query(
                    "SELECT COUNT(*) AS n_friends FROM user_friend WHERE user_origin = ?",
                    [userId]
                );
                connection.release();
                
                res.status(200).send({ data: users[0], n_friends: friends[0].n_friends });
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
