package routes

import (
	"net/http"

	"CreateStoryService/Controller"
	"CreateStoryService/middleware"
	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	r := mux.NewRouter()
	r.Handle("/api/createStory", middleware.AuthMiddleware(http.HandlerFunc(controller.CreateStory))).Methods("POST")
	return r
}