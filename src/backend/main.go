package main

import (
	"fmt"
	"log"
	"net/http"

	"gitlab.bht-berlin.de/jala5026/kimbaa/middleware"
)

const addr string = "0.0.0.0/"

func handleOther(w http.ResponseWriter, r *http.Request) {
	log.Println("Received a non domain request")
	w.Write([]byte("Hello, stranger..."))
}

func handle(w http.ResponseWriter, r *http.Request) {
	log.Println("Received a request at my domain")
	w.Write([]byte("Hello, Domain name!"))
}

func main() {
	router := http.NewServeMux()
	stack := middleware.CreateStack(
		middleware.Logging,
	)
	router.HandleFunc("/", handleOther)
	router.HandleFunc(addr, handle)

	server := http.Server{
		Addr:    ":8080",
		Handler: stack(router),
	}

	fmt.Println("Server listening on port :8080")
	server.ListenAndServe()
}
