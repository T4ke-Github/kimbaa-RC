import express, { NextFunction, Request, Response } from 'express';
import { ModulResource } from "../Resources";
import * as modulService from "../services/ModulService";

export const modulRouter = express.Router();

// Route zum Abrufen aller Module
modulRouter.get("/alle/:studentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId;
        const modules = await modulService.getAlleModule(studentId);
        res.status(200).send(modules);
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});

// Route zum Aktualisieren von Modulen anhand des Modulnamens und der Benutzer-ID
modulRouter.put("/update", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modules: ModulResource[] = req.body.modules;
        await modulService.updateModulesByModuleNameAndUserId(modules);
        res.status(200).send({ message: "Module erfolgreich aktualisiert" });
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});

// Route zum Abrufen der Modulzusammenfassung
modulRouter.get("/summary/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await modulService.calculateModuleSummary(req.params.userId);
        res.status(200).send(summary);
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});
