import express, { Request, Response, NextFunction } from 'express';

import * as userService from "../services/UserService";
import * as serviceHelper from "../services/ServiceHelper";
import { UserResource } from "../Resources";
import { logger } from '../backlogger';

export const userRouter = express.Router();

userRouter.get("/alle", async (req: Request, res: Response, next ) => {
    try {
        const users = await userService.getAlleUser();
        res.send(users);
    } catch (error) {
        res.status(500);
        next(error);
    }
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
            user = await getOneUser({ email: String(identifier) });
        } else {
            throw new Error("Invalid identifier format");
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("userRouter.Fehler beim Abrufen des Benutzers: " + error.message);
    }
});
//CREate

userRouter.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userResource: UserResource = req.body;
        logger.info("UserResource: " + userResource);
        logger.info("User name: " + userResource.name);
        logger.info("User password: " + userResource.password);
        logger.info("User studentId: " + userResource.studentId);
        logger.info("User email: " + userResource.email);
        // Validierung der Anfragedaten
        if (!userResource.name || !userResource.password || !userResource.studentId || !userResource.email) {
            res.status(400).send({ error: "Missing required fields" });
            return;
        }
        try {
            const user = await userService.createUser(userResource);
            res.status(201).send(user);
        } catch (error) {
            logger.error("UserRouter.create: Fehler beim Erstellen des Users: " + error);
        }
        

        
    } catch (error) {
        res.status(500);
        next(error);
    }
});