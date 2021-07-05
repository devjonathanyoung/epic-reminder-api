import winston from "winston";

const { errors, timestamp, colorize, simple } = winston.format;

const { printf } = winston.format;

const customFormat = printf((printInput) => {
	const { level, message, timestamp: ts, stack } = printInput;
	return `${ts} ${level}: ${message || ""} ${stack || ""}`;
});

const format = winston.format.combine(
	errors({ stack: true }),
	timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	colorize(), simple(), customFormat
);

const logger = winston.createLogger({ format: winston.format.json(), transports: [new (winston.transports.Console)({ format, timestamp: true })] });

logger.stream = { write: (message) => { logger.info(message); } };

export default logger;
