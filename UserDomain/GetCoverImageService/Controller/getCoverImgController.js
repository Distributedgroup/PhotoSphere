const get_cover_img = async function(req,res){
    var img = req.params['img'];
    fs.stat('./uploads/portadas/'+img, function(err){
        if(err){
            res.status(200).send({message:'No se encontró la imagen'});
        }else{
            let path_img = './uploads/portadas/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

module.exports = {
    get_cover_img
}