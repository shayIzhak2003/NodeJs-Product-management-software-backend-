const fs = require('fs');

const logRequest = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} - ${req.method} - ${req.url}\n`;
  fs.appendFileSync('logs/requests.log', logEntry);
  next();
};

module.exports = logRequest;
