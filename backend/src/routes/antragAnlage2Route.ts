import express, { Request, Response, NextFunction } from 'express';
import * as antragAnlage2Service from '../services/AntragAnlage2Service';
import { logger } from '../logger/routeLogger';

export const antragAnlage2Router = express.Router();

antragAnlage2Router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const anlage2 = await antragAnlage2Service.createAntragAnlage2(req.body);
        res.status(201).send(anlage2);
    } catch (error) {
        logger.error("Error creating AntragAnlage2: " + error);
        res.status(400).send(error);
        next(error);
    }
});

antragAnlage2Router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const anlage2 = await antragAnlage2Service.getAntragAnlage2ById(req.params.id);
        if (anlage2) {
            res.status(200).send(anlage2);
        } else {
            res.status(404).send("Anlage2 not found");
        }
    } catch (error) {
        logger.error("Error fetching AntragAnlage2: " + error);
        res.status(400).send(error);
        next(error);
    }
});

antragAnlage2Router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const anlage2 = await antragAnlage2Service.updateAntragAnlage2({ id: req.params.id, ...req.body });
        if (anlage2) {
            res.status(200).send(anlage2);
        } else {
            res.status(404).send("Anlage2 not found");
        }
    } catch (error) {
        logger.error("Error updating AntragAnlage2: " + error);
        res.status(400).send(error);
        next(error);
    }
});

antragAnlage2Router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await antragAnlage2Service.deleteAntragAnlage2(req.params.id);
        res.status(204).send();
    } catch (error) {
        logger.error("Error deleting AntragAnlage2: " + error);
        res.status(400).send(error);
        next(error);
    }
});
