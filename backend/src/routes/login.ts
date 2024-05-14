import express from "express";
import * as userService from "../services/UserService";
import * as authenticationService from "../services/AuthenticationService";

export const loginRouter = express.Router();

// Route für den Login
loginRouter.post("/login", async (req, res, next) => {
    try {
        const { studentId, password } = req.body; // Annahme: Student-ID und Passwort werden im Anfragekörper übergeben

        // Überprüfe die Anmeldeinformationen
        const loginResult = await authenticationService.login(studentId, password);
        
        if (loginResult) {
            // Erfolgreicher Login
            res.status(200).json(loginResult); // Gib Benutzer-ID und Rolle zurück
            
        } else {
            // Fehlgeschlagener Login
            res.status(401).send("Unauthorized"); // Oder eine angemessene Fehlermeldung
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
        next(error);
    }
});