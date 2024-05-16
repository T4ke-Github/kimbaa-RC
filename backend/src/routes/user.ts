import express, { Request, Response, NextFunction } from 'express';

import * as userService from "../services/UserService";
import { User } from "../model/UserModel";
import { UserResource } from "../Resources";
import { logger } from '../backlogger';

export const userRouter = express.Router();

userRouter.get("/alle", async (req, res, next) => {
    try {
        const users = await userService.getAlleUser();
        res.send(users);
    } catch (error) {
        res.status(500);
        next(error);
    }
});
//getOne by studentId
userRouter.get("/getOneId/:studentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId;
        const user = await userService.getOneUser({ studentId: Number(studentId) });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("userRouter.Fehler beim Abrufen des Benutzers: " + error);
    }
})
userRouter.get("/getOneEmail/:email", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const user = await userService.getOneUser({ email: String(email) });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("userRouter.Fehler beim Abrufen des Benutzers: " + error);
    }
})
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