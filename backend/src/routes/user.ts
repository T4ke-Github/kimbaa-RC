import express from "express";
import * as userService from "../services/UserService";

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
