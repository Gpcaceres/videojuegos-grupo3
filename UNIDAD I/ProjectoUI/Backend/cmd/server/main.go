// Servidor HTTP del Tres en Raya (Proyecto 3 · Grupo 3).
//
//	go run ./cmd/server            -> escucha en :8080
//	PORT=9000 go run ./cmd/server  -> otro puerto
//	CORS_ORIGINS=http://localhost:4200,https://mi-front.app
package main

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/Gpcaceres/videojuegos-grupo3/backend/internal/api"
)

func main() {
	port := getenv("PORT", "8080")
	origins := strings.Split(getenv("CORS_ORIGINS", "http://localhost:4200"), ",")

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           api.NewServer(origins).Routes(),
		ReadHeaderTimeout: 5 * time.Second,
	}
	log.Printf("Tres en Raya API escuchando en http://localhost:%s", port)
	log.Fatal(srv.ListenAndServe())
}

func getenv(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}
