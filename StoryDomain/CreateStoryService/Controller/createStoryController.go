package controller

import (
	"context"
	"encoding/json"
	"net/http"
	"path/filepath"
	"time"
	"log"

	"CreateStoryService/database"
	"CreateStoryService/Model"
	"CreateStoryService/middleware"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateStory(w http.ResponseWriter, r *http.Request) {

	value := r.Context().Value("user")

	claims, ok := value.(*middleware.Claims)
	if !ok {
		http.Error(w, "Error getting user data", http.StatusInternalServerError)
		return
	}

	objectID, err := primitive.ObjectIDFromHex(claims.Sub)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusInternalServerError)
		return
	}

	err = r.ParseMultipartForm(10 << 20) 
	if err != nil {
		http.Error(w, "Error parsing form", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "File upload error", http.StatusBadRequest)
		return
	
	defer file.Close()

	imgPath := filepath.Base("uploads/stories/image.jpg")

	exp := time.Now().Add(24 * time.Hour)

	story := Model.Story{
		User:      objectID, 
		Image:     imgPath,
		Exp:       exp,
		// CreatedAt: time.Now(),
	}

	collection := database.DB.Collection("stories")
	_, err = collection.InsertOne(context.TODO(), story)
	if err != nil {
		http.Error(w, "Error saving story", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(story)
	log.Println("ID received from the token (claims.Sub):", claims.Sub)
	log.Println("User ID in claims.Sub:", claims.Sub)
}
