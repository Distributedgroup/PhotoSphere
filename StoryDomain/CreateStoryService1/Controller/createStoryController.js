var Story = require('../model/Story');
var fs = require('fs');
var path = require('path');

const createStory = async function (req, res) {
    if (req.user) {

        let img_path = req.files.imagen.path.split('\\')[2];

        let exp = new Date();
        exp.setDate(exp.getDate() + 1);

        let story = await Story.create({
            user: req.user.sub,
            image: img_path,
            exp: exp
        });

        res.status(200).send({ data:story });

    } else {
        res.status(403).send({ message: 'NoAccess' });
    }
}
module.exports = {
    createStory
}
