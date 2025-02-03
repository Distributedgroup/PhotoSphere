package helpers

import (
	"time"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateToken(userID primitive.ObjectID, names string, surnames string, email string) (string, error) {
	claims := jwt.MapClaims{
		"sub":      userID.Hex(),  // ✅ Convert ObjectID to hexadecimal string
		"names":    names,
		"surnames": surnames,
		"email":    email,
		"iat":      time.Now().Unix(),
		"exp":      time.Now().Add(time.Hour * 24 * 30).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte("6M5X#D6%7Nh*!pkR3HL7F@Fdx"))
}