package routes

import (
	"net/http"

	"GetUserStoriesService/controller"
	
	"GetUserStoriesService/middleware"
)

func GetUserStoriesRoutes(mux *http.ServeMux) {
	mux.Handle("/api/getUserStories", middleware.AuthMiddleware(http.HandlerFunc(controller.GetUserStories)))
}