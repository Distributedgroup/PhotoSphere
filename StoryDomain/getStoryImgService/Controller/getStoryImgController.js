const get_story_img = async function (req, res) {
    var img = req.params['img'];
    fs.stat('./uploads/stories/' + img, function (err) {
        if (err) {
            res.status(200).send({ message: 'No se encontró la imagen' });
        } else {
            let path_img = './uploads/stories/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}
module.exports = {
    get_story_img
}


