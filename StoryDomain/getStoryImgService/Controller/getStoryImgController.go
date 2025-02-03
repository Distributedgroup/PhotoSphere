package controller

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"github.com/gorilla/mux"
)


func GetStoryImg(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	img, exists := vars["img"]
	if !exists {
		http.Error(w, "Image parameter not found", http.StatusBadRequest)
		return
	}

	imagePath := filepath.Join("uploads", "stories", img)

	_, err := os.Stat(imagePath)
	if os.IsNotExist(err) {
		http.Error(w, "Image not found", http.StatusNotFound)
		return
	} else if err != nil {
		log.Println("Error verifying image:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	http.ServeFile(w, r, imagePath)
}