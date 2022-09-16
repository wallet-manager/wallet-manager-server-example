
import {loadConfig} from "wallet-manager-client-utils";
const CONFIG = loadConfig('config');
import { createLogger, format, transports}  from 'winston';
const { combine, timestamp, label, printf, errors} = format;
import path from "path";

export const loggerFactory = (filePath) => {

    const fileName = path.basename(filePath, '.js');

    const myFormat = printf(({ level, message, label, timestamp, stack}) => {
        if (stack) {
          // print log trace 
          return `${timestamp} [${label}] ${level}: ${message} - ${stack}`;
        }
        return `${timestamp} [${label}] ${level}: ${message}`;
    });

    const logger = createLogger({
        level: CONFIG.logLevel || "info",
        format: combine(
          errors({ stack: true }),
          timestamp(),
          label({ label:fileName }),
          myFormat
        ),
        transports: [new transports.Console()]
      });
    return logger;
};

