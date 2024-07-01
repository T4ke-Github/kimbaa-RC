import express, { NextFunction, Request, Response } from "express";
import { body, validationResult, matchedData } from "express-validator";
import cookieParser from 'cookie-parser';
import { verifyPasswordAndCreateJWT, verifyJWT } from '../services/JWTService';
import * as authenticationService from "../services/AuthenticationService";
import * as userService from "../services/UserService";
import { User } from "../model/UserModel";
import { logger } from '../logger/authenticationLogger';

export const loginRouter = express.Router();
loginRouter.use(cookieParser());

const postValidationRules = [
    body("studentId").isLength({ min: 1, max: 100 }),
    body("password").isStrongPassword().withMessage("Das Passwort ist zu schwach")
];

loginRouter.post("/login", postValidationRules, async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    const loginResource = matchedData(req);
    try {
        const { studentId, password } = loginResource;

        // Check login credentials
        const loginResult = await authenticationService.login(studentId, password);
        const user = await User.findOne({ studentId }).exec();
        
        if (loginResult && user) {
            const jwt = await verifyPasswordAndCreateJWT(studentId, password);
            if (jwt) {
                res.cookie("access_token", jwt, { httpOnly: true, secure: true, sameSite: 'none', expires: new Date(Date.UTC(2030, 0, 1) + 55000) });
                res.status(200).json({ user, jwt });
            } else {
                res.status(401).json(false);
            }
        } else {
            res.status(401).json(false);
        }
    } catch (err) {
        logger.error("loginRoute.ts post" + err);
        res.status(401).send(err);
        next(err);
    }
});

loginRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = await verifyJWT(req.cookies.access_token);
        if (jwt) {
            res.status(200).send(jwt);
        } else {
            res.status(401).send(false);
        }
    } catch (error) {
        res.status(400).send("Bad Request" + error);
        next(error);
    }
});

loginRouter.delete("/", async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: 'none', expires: new Date(0) });
    res.sendStatus(200);
});
