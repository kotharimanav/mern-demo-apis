const { createLogger, transports, format } = require('winston');


/**
 * @description Output directory
 */
const env = 'development';
const output = env === 'development' ? 'dev' : 'prod';

/**
 * @description Output Format
 */
const formatter = format.printf(({ level, message, label, timestamp }) => `${timestamp} [${level}]: [${label}]:${message}`);

/**
 * @description Default transport options
 */
const options = {
  error: {
    level: 'error',
    format: format.combine(format.timestamp(), formatter),
    filename: `${process.cwd()}/logs/${output}/combined.log`,
    handleException: true,
    json: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  info: {
    level: 'info',
    format: format.combine(format.timestamp(), formatter),
    filename: `${process.cwd()}/logs/${output}/combined.log`,
    handleException: false,
    json: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.align(),
      formatter,
    ),
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

/**
 * @description Create Logger with options
 */
const logger = createLogger({
  level: 'info',
  transports: [
    /**
     * Write to all logs with level `info` and below to `combined.log`.
     * Write all logs error (and below) to `error.log`.
     */
    new transports.File(options.error),
    new transports.File(options.info),
  ],
  exitOnError: false,
});

if (env !== 'dist') {
  logger.add(new transports.Console(options.console));
}

logger.stream = {
  /**
   * Message form incoming request
   *
   * @param {string} message
   */
  write(message) {
    logger.info(message.trim());
  },
};

exports.stream = logger.stream;
/**
 * Enable Logging in Application
 *
 * @see https://npmjs.com/package/winston
 */
module.exports = logger;
