/* istanbul ignore file */
//write logger.info or logger.error("BLAGH") for logging messages
import { log_level } from "../app";
import winston from "winston";

export const logger = winston.createLogger({
    level: log_level,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.colorize({ all: true })
            ),
        }),
        new winston.transports.File({
            filename: '../backend/logFiles/routeTest.log',
            format: winston.format.simple()
        })
    ]
});