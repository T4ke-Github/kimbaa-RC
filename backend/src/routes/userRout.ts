import express, { Request, Response, NextFunction } from 'express';

import * as userService from "../services/UserService";
import * as serviceHelper from "../services/ServiceHelper";
import { UserResource } from "../Resources";
import { logger } from '../backlogger';

export const userRouter = express.Router();

userRouter.get("/alle", async (req: Request, res: Response, next ) => {
        const users = await userService.getAlleUser();
        res.send(users);
});
//getOne by studentId
userRouter.get("/:identifier", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identifier = req.params.identifier;

        let user;
        if (!isNaN(Number(identifier))) {
            // Wenn identifier eine Nummer ist, dann ist es eine studentId
            user = await userService.getOneUser({ studentId: Number(identifier) });
            
        } else if (serviceHelper.isEmail(identifier)) {
            // Wenn identifier das Format einer E-Mail hat, dann ist es eine email
            user = await userService.getOneUser({ email: String(identifier) });
            
        }else {
            // Wenn weder eine Studenten-ID noch eine E-Mail-Adresse erkannt wird, lösen wir einen Fehler aus
            throw new Error("Invalid identifier");
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});
//CREate

userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {

        const userResource: UserResource = req.body;
        // Validierung der Anfragedaten
        try {
            const user = await userService.createUser(userResource);
            res.status(201).send(user);
        } catch (error) {
            logger.error("UserRouter.create: Fehler beim Erstellen des Users: " + error);
            res.status(400).send(error);
            next(error);
        }
});

userRouter.put("/:identifier", async (req: Request, res: Response, next: NextFunction) => {
    const userResource: UserResource = req.body;
    try {
        const user = await userService.updateUser(userResource);
        logger.info("UserService.updateUser: User aktualisiert ");
        res.status(200).send(user);
    } catch (error) {
        logger.error("UserService.updateUser: Fehler beim Aktualisieren des Users: " + error);
        res.status(400).send(error);
        next(error);
    }
})
userRouter.delete("/:identifier", async (req: Request, res: Response, next: NextFunction) => {
    const identifier = req.params.identifier;
    try {
        const user = await userService.deleteUser(identifier);
        res.status(200).send(user);
    } catch (error) {
        logger.error("UserService.deleteUser: Fehler beim Loeschen des Users: " + error);
        res.status(400).send(error);
        next(error);
    }
})