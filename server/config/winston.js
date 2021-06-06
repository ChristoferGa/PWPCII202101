/* eslint-disable prettier/prettier */
// Importando a winston
import winston, { format } from "winston";
import appRoot from "app-root-path";

// Componentes para crear el formato personalizado
const { combine, colorize, timestamp, printf, uncolorize, json } = format;
//
// Creando el perfil de color para el log
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "green",
};
// Agregando el perfil a winston
winston.addColors(colors);

// Formato de consola
const myFormat = combine(
  colorize({ all: true }),
  timestamp(),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Formato para la salida de los archivos de log
const myFileFormat = combine(uncolorize(), timestamp(), json());
// Creando objetos de configuración
const option = {
  infoFile: {
    level: "info",
    filename: `${appRoot}/server/logs/infos.log`,
    handleExceptions: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: "warn",
    filename: `${appRoot}/server/logs/warn.log`,
    handleExceptions: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: "error",
    filename: `${appRoot}/server/logs/errors.log`,
    handleExceptions: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myFormat,
  },
};

// Creando la instaca del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(option.infoFile),
    new winston.transports.File(option.warnFile),
    new winston.transports.File(option.errorFile),
    new winston.transports.File(option.console),
  ],
  exitOnError: false, // No finaliza en excepciones manejadas
});

//
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
