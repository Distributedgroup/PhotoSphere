// var fs = require('fs');
// var path = require('path');

// const get_story_img = async function (req, res) {
//     var img = req.params['img'];
//     fs.stat('./uploads/stories/' + img, function (err) {
//         if (err) {
//             res.status(200).send({ message: 'No se encontró la imagen' });
//         } else {
//             let path_img = './uploads/stories/' + img;
//             res.status(200).sendFile(path.resolve(path_img));
//         }
//     });
// }
// module.exports = {
//     get_story_img
// }


package controller

import (
	"net/http"
	"path/filepath"
	"github.com/gin-gonic/gin"
	"os"
)

func GetStoryImg(c *gin.Context) {
	img := c.Param("img")
	imgPath := filepath.Join("./uploads/stories/", img)

	if _, err := os.Stat(imgPath); os.IsNotExist(err) {
		c.JSON(http.StatusOK, gin.H{"message": "No se encontró la imagen"})
		return
	}

	c.File(imgPath)
}

func main() {
	r := gin.Default()
	r.GET("/story/img/:img", getStoryImg)

	r.Run(":8080") // Servidor en el puerto 8080
}


