import { createLogger, format, transports } from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';

import type { Logger } from "winston";

const customFormat = format.printf(({ timestamp, level, message }) => {
    return `[${timestamp} ${level.toLocaleUpperCase()}] ${message}`;
});

const customFormatColoured = format.printf(({ timestamp, level, message }) => {
    return format.colorize().colorize(level, `[${timestamp} ${level.toLocaleUpperCase()}] ${message}`);
});

const logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
        format: 'DD-MMM-YYYY HH:mm:ss'
        }),
        format.errors({ stack: true }),
        customFormat
    ),
    transports: [
        new transports.Console({
            format: customFormatColoured,
        }),
    ],
});

// If we're in production then log to the files
if (process.env.NODE_ENV === 'production') {
    logger.add(new DailyRotateFile({
        level: 'error',
        filename: 'logs/%DATE%/error.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    }))
    logger.add(new DailyRotateFile({
        filename: 'logs/%DATE%/combined.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    }));
}

export default logger;