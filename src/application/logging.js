import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  transports: [new winston.transports.Console()],
});

export { logger };
