package controller

import (
    "encoding/json"  
    "context"
    "log"
    "net/http"
    "time"

    "GetUserStoriesService/database"
    "GetUserStoriesService/Models"
    "GetUserStoriesService/middleware"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
)


func GetUserStories(w http.ResponseWriter, r *http.Request) {
    
    user, ok := r.Context().Value("user").(*middleware.Claims)
    if !ok {
        http.Error(w, "NoAccess", http.StatusForbidden)
        return
    }

   
    userID, err := primitive.ObjectIDFromHex(user.Sub)
    if err != nil {
        log.Println("Error converting user ID to ObjectID:", err)
        http.Error(w, "Invalid user ID", http.StatusInternalServerError)
        return
    }

   
    client, err := database.GetMongoClient()
    if err != nil {
        http.Error(w, "Database connection error", http.StatusInternalServerError)
        return
    }

    
    userFriendCollection := client.Database("social").Collection("user_friends")
    storyCollection := client.Database("social").Collection("stories")

    var friends []Models.UserFriend
    cursor, err := userFriendCollection.Find(context.TODO(), bson.M{"user_origin": userID})
    if err != nil {
        log.Println("Error fetching user friends:", err)
        http.Error(w, "Error fetching user friends", http.StatusInternalServerError)
        return
    }
    defer cursor.Close(context.TODO())

    if err = cursor.All(context.TODO(), &friends); err != nil {
        log.Println("Error decoding user friends:", err)
        http.Error(w, "Error decoding user friends", http.StatusInternalServerError)
        return
    }

    log.Println("Friends found:", len(friends))

    var currentStories []Models.Story
    today := time.Now().Unix()

    for _, friend := range friends {
        log.Println("Checking stories for friend ID:", friend.UserFriend)
        var stories []Models.Story
        cursor, err := storyCollection.Find(context.TODO(), bson.M{"user": friend.UserFriend})
        if err != nil {
            log.Println("Error fetching stories for user:", err)
            http.Error(w, "Error fetching stories", http.StatusInternalServerError)
            return
        }
        defer cursor.Close(context.TODO())

        if err = cursor.All(context.TODO(), &stories); err != nil {
            log.Println("Error decoding stories:", err)
            http.Error(w, "Error decoding stories", http.StatusInternalServerError)
            return
        }

        log.Println("Stories found for friend:", len(stories))

        for _, story := range stories {
            createdAt := story.CreatedAt.Unix()
            exp := story.Exp.Unix()
            log.Println("Story CreatedAt:", createdAt, " Exp:", exp, " Today:", today)

            if today >= createdAt && today <= exp {
                currentStories = append(currentStories, story)
            }
        }
    }

    log.Println("Total active stories:", len(currentStories))

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{"data": currentStories})
}