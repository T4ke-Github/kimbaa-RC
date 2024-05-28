import express from "express";
import * as userService from "../services/UserService";
import * as authenticationService from "../services/AuthenticationService";
import { User } from "../model/UserModel";
import { UserResource } from "../Resources";

export const loginRouter = express.Router();

// Route für den Login
loginRouter.post("/login", async (req, res, next) => {

        const { studentId, password } = req.body; // Annahme: Student-ID und Passwort werden im Anfragekörper übergeben

        // Überprüfe die Anmeldeinformationen
        const loginResult = await authenticationService.login(studentId, password);
        const user = await User.findOne({ studentId }).exec();
        if (loginResult && user) {
            // Erfolgreicher Login
            
            res.status(200).json({user,loginResult}); // Gib Benutzer-ID und Rolle zurück
        } else {
            // Fehlgeschlagener Login
            res.status(401).json(false);
        }

});