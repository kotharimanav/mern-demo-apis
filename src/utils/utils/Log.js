const logger = require('./Logger');

/**
 * @description Logger class
 */
class Logger {
  /**
   * @description Name of file
   *
   * @param {string} label
   */
  constructor(label) {
    this.label = label;
  }

  /**
   * @description Info logs
   *
   * @param {string} message
   */
  log(message) {
    return logger.info(message, { label: this.label });
  }

  /**
   * @description Error logs
   *
   * @param {string} message
   */
  error(message) {
    return logger.error(message, { label: this.label });
  }

  /**
   * @description Debug logs
   *
   * @param {string} message
   */
  debug(message) {
    return logger.debug(message, { label: this.label });
  }

  /**
   * @description warning logs
   *
   * @param {string} message
   */
  warn(message) {
    return logger.warn(message, { label: this.label });
  }
}

module.exports = Logger;
