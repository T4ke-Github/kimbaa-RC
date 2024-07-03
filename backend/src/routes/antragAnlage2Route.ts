import express, { NextFunction, Request, Response } from 'express';
import * as antragAnlage2Service from "../services/AntragAnlage2Service";
import * as userService from "../services/UserService";

export const antragAnlage2Router = express.Router();

// Route to get Anlage2 details
antragAnlage2Router.get("/:identifier", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identifier = req.params.identifier;
        const user = await userService.getOneUser({ studentId: String(identifier) });
        const anlage2 = await antragAnlage2Service.getAntragAnlage2ById(user.id!);

        if (anlage2 === null) {
            return res.status(404).send("Anlage2 nicht gefunden.");
        }

        res.status(200).send({ antragAnlage2Details: anlage2 });

    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});

// Route to update Anlage2 details
antragAnlage2Router.put("/:identifier", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identifier = req.params.identifier;
        const anlage2Resource = req.body;

        const user = await userService.getOneUser({ studentId: String(identifier) });
        let anlage2 = await antragAnlage2Service.getAntragAnlage2ById(user.id!);

        if (anlage2) {
            // If Anlage2 exists, update it
            anlage2 = await antragAnlage2Service.updateAntragAnlage2({
                id: anlage2.id,
                ...anlage2Resource
            });
        } else {
            // If no Anlage2 exists, create a new one
            anlage2 = await antragAnlage2Service.createAntragAnlage2({
                creator: user.id,
                studentid: user.studentId,
                ...anlage2Resource
            });
        }

        res.status(200).send({ antragAnlage2Details: anlage2 });

    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});
