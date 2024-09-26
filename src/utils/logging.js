// utils/logging.js
const fs = require('fs');
const path = require('path');

async function setupLogging() {
  const chalk = await import('chalk');
  const stripAnsi = await import('strip-ansi');

  const logLevels = {
    info: chalk.default.blue.bold,
    success: chalk.default.green.bold,
    warning: chalk.default.yellow.bold,
    error: chalk.default.red.bold,
    highlight: chalk.default.magenta.bold,
    timestamp: chalk.default.gray,
  };

  const log = console.log;

  const logDir = path.join(__dirname, '../logs');
  const logFileName = `${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.log`;
  const logFilePath = path.join(logDir, logFileName);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function getFormattedTimestamp() {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok', // UTC+7
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(date);

    return `${parts[2].value}/${parts[0].value}/${parts[4].value} AT (${parts[6].value}:${parts[8].value})`;
  }

  console.log = (...args) => {
    if (process.env.NODE_ENV !== 'test') {
      const displayTime = getFormattedTimestamp();
      let message = args.join(' ');

      if (message.includes('Executing')) {
        message = message.replace('Executing', logLevels.highlight('Executing'));
      }

      const plainMessage = stripAnsi.default(message); // Strip colors for the log file

      const logToFile = `${displayTime}: ${plainMessage}\n`;
      fs.appendFileSync(logFilePath, logToFile);

      let colorizedLog;
      // const level = args[0].toLowerCase();
      const level = typeof args[0] === 'string' ? args[0].toLowerCase() : '';


      switch (level) {
        case 'info':
          colorizedLog = logLevels.info(`[INFO] ${message}`);
          break;
        case 'success':
          colorizedLog = logLevels.success(`[SUCCESS] ${message}`);
          break;
        case 'warning':
          colorizedLog = logLevels.warning(`[WARNING] ${message}`);
          break;
        case 'error':
          colorizedLog = logLevels.error(`[ERROR] ${message}`);
          break;
        default:
          colorizedLog = message;
      }

      return log(`${logLevels.timestamp(displayTime)}: ${colorizedLog}`);
    }
  };
}

setupLogging();