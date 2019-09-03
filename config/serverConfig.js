const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const fs = require('fs');

module.exports = (server) => {
  if (fs.existsSync(path.join(__dirname, 'favicon.ico')))
    server.use(favicon(path.join(__dirname, 'favicon.ico')));
  server.use(morgan('dev'));
  server.use(bodyParser.json());
  server.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(methodOverride('X-HTTP-Method-Override'));
  server.use(helmet());
  server.use(compression());

  /* Enable CORS */
  server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};
