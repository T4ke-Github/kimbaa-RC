import express from "express";
import * as userService from "../services/UserService";
import { User } from "../model/UserModel";

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
/* 
userRouter.get("/getOne", async (req, res, next) => {
    try {
        const { studentId } = req.query;
        const user = await userService.findById({studentId}).exec();
        
        //create body to send back

        if (user?.studentId === studentId) {
            res.send(user);
        }else{
            res.status(404).send("User not found");
        }
        
    } catch (error) {
        res.status(500);
        next(error);
    }
});
 */

//CREate

userRouter.post("/create", async (req, res, next) => {
    try {
        const userResource = req.body;
        const user = await userService.createUser(userResource);
        res.send(user);
    } catch (error) {
        res.status(500);
        next(error);
    }
});