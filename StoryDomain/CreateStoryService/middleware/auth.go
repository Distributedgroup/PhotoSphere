package middleware

import (
	"context"
	"net/http"
	"strings"
	"log"

	"github.com/dgrijalva/jwt-go"
)

var secretKey = []byte("6M5X#D6%7Nh*!pkR3HL7F@Fdx")

type Claims struct {
	Sub      string `json:"sub"`
	Names    string `json:"names"`
	Surnames string `json:"surnames"`
	Email    string `json:"email"`
	jwt.StandardClaims
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "NoHeadersError", http.StatusForbidden)
			return
		}

		tokenString := strings.Replace(authHeader, "\"", "", -1)

		// Imprimir el token recibido para depuración
		log.Println("Token received:", tokenString)

		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte("6M5X#D6%7Nh*!pkR3HL7F@Fdx"), nil
		})

		// Verificar si el token es inválido
		if err != nil || !token.Valid {
			log.Println("Error: Invalid token:", err)
			http.Error(w, "InvalidToken", http.StatusForbidden)
			return
		}

		// Extraer las claims del token
		claims, ok := token.Claims.(*Claims)
		if !ok {
			log.Println("Error: Failed to extract token claims")
			http.Error(w, "InvalidToken", http.StatusForbidden)
			return
		}

		// Verificar si el token ha expirado
		if claims.ExpiresAt < jwt.TimeFunc().Unix() {
			log.Println("Error: Token expired")
			http.Error(w, "TokenExpired", http.StatusForbidden)
			return
		}

		// Imprimir los datos del usuario autenticado
		log.Printf("Authenticated user: %s (Email: %s)", claims.Sub, claims.Email)

		// Agregar claims al contexto
		ctx := context.WithValue(r.Context(), "user", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})

	
}