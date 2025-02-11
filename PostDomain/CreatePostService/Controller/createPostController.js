const { mysqlPool } = require('../app'); // Importar conexión MySQL
const Post = require('../models/Post'); // Usa MongoDB `socialN`
const Notification = require('../models/Notification'); // Usa MongoDB `socialP`
const { getFriends } = require('../models/User_Friend'); // Funciones para MySQL
const fs = require('fs');
const path = require('path');

const create_post = async function(req, res) {
    if (req.user) {
        try {
            let data = req.body;

            if (data.tipo === 'Media') {
                let img_path = req.files.media.path.split('\\')[2];
                data.media = img_path;
            }

            data.user = req.user.sub;

            // Crear post en MongoDB `socialN`
            let post = await Post.create(data);

            // Obtener amigos desde MySQL
            let friends = await getFriends(req.user.sub);

            for (let item of friends) {
                let description = `${req.user.names.split(' ')[0]} ${req.user.surnames.split(' ')[0]} ha creado una nueva publicación`;

                // Crear notificación en MongoDB `socialP`
                await Notification.create({
                    type: 'Publicaciones',
                    description,
                    user_interaction: req.user.sub,
                    user: item.user_friend,
                    post: post._id
                });
            }

            res.status(200).send({ data: post, friends });
        } catch (error) {
            console.log(error);
            res.status(500).send({ data: undefined, message: 'No se pudo crear la publicación.' });
        }
    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
};

module.exports = { create_post };
