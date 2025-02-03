package routes

import (

	"GetStoryImgService/controller"
	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/api/getStoryImg/{img}", controller.GetStoryImg).Methods("GET") 
	return r
}