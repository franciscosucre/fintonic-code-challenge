const { ConsoleLoggerPlugIn, Logger } = require('@sugo/logger');

const logger = new Logger({ plugins: [new ConsoleLoggerPlugIn()] });

module.exports = logger;
