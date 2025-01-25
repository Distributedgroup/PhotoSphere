const axios = require('axios');
const Storie = require('../models/Storie'); // Modelo de historias

const fetchUserFriends = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}/friends`);
        return response.data.friends; // Asume que el servicio devuelve la lista de amigos
    } catch (error) {
        console.error('Error fetching user friends:', error);
        throw new Error('Failed to fetch user friends');
    }
};

const get_user_stories = async function (req, res) {
    if (req.user) {
        try {
            // Obtén la lista de amigos desde el servicio de usuarios
            const friends = await fetchUserFriends(req.user.sub);

            let today = Date.parse(new Date()) / 1000;
            var current_stories_ = [];

            for (var item of friends) {
                var current_stories = [];
                var stories = await Storie.find({ user: item.friendId }).populate('user');

                for (var subitem of stories) {
                    var tt_created = Date.parse(subitem.createdAt) / 1000;
                    var tt_exp = Date.parse(subitem.exp) / 1000;

                    if (today >= tt_created && today <= tt_exp) {
                        current_stories.push(subitem);
                        current_stories_.push(subitem);
                    }
                }
            }

            res.status(200).send({ data: current_stories_ });
        } catch (error) {
            res.status(500).send({ message: 'Error fetching user stories', error });
        }
    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
};

module.exports = {
    get_user_stories
};
