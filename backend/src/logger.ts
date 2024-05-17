/* istanbul ignore file */
//write logger.info or logger.error("BLAGH") for logging messages
import winston from "winston";

let log_level = process.env.LOG_LEVEL;
    if (!log_level) {
        log_level = 'info'
    }

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
            filename: 'all.log',
            format: winston.format.simple()
        })
    ]
});