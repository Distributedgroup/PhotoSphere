const { mysqlPool } = require('../app'); // Importar conexión MySQL
const Post = require('../Models/Post'); // Usa MongoDB `socialN`
const Notification = require('../Models/Notification'); // Usa MongoDB `socialP`
const { getFriends } = require('../Models/User_friend'); // Funciones para MySQL
const fs = require('fs');
const path = require('path');

const create_post = async function(req, res) {
    if (req.user) {
        try {
            let data = req.body;

            if (data.type === 'media') {
                let filePath = req.files.media.path;
                let fileName = filePath.split('/').pop(); // Ojo: en Linux se usa `/`
                data.media = fileName;
            }


            data.user = req.user.sub;

            // Crear post en MongoDB `socialN`
            let post = await Post.create(data);

            // Obtener amigos desde MySQL
            let friends = await getFriends(req.user.sub);
            console.log('Amigos obtenidos:', friends);
            console.log('Usuario autenticado:', req.user);


            
                for (let item of friends) {
                    try {
                        let firstName = req.user.names ? req.user.names.split(' ')[0] : 'Usuario';
                        let lastName = req.user.surnames ? req.user.surnames.split(' ')[0] : '';
                
                        let description = `${firstName} ${lastName} ha creado una nueva publicación`;
                
                        let notification = await Notification.create({
                            type: 'Publicaciones',
                            description,
                            user_interaction: req.user.sub,
                            user: item.user_friend,
                            post: post._id
                        });
                
                        console.log('✅ Notificación creada:', notification);
                    } catch (error) {
                        console.error('❌ Error al crear la notificación:', error);
                    }
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
