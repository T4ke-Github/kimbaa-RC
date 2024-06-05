import express, { NextFunction, Request, Response } from 'express';
import * as antragZulassungService from "../services/AntragZulassungService";
import * as userService from "../services/UserService";

export const antragZulassungRouter = express.Router();

// Route to get application details
antragZulassungRouter.get("/:identifier", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identifier = req.params.identifier;
        const user = await userService.getOneUser({ studentId: String(identifier) });
        const application = await antragZulassungService.getApplicationById(user.id!);

        if (application === null) {
            return res.status(404).send("Antrag nicht gefunden.");
        }

        res.status(200).send({ antragZulassungDetails: application });

    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});

// Route to update application details
antragZulassungRouter.put("/:identifier", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identifier = req.params.identifier;
        const applicationResource = req.body;

        const user = await userService.getOneUser({ studentId: String(identifier) });
        let application = await antragZulassungService.getApplicationById(user.id!);

        if (application) {
            // If application exists, update it
            application = await antragZulassungService.updateApplication({
                id: application.id,
                ...applicationResource
            });
        } else {
            // If no application exists, create a new one
            application = await antragZulassungService.createApplication({
                creator: user.id,
                studentid: user.studentId,
                ...applicationResource
            });
        }

        res.status(200).send({ antragZulassungDetails: application });

    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});
