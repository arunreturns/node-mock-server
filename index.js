const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const generateSchema = require('./generateSchema');
const logger = require("./loggerConfig");
const fs = require("fs");

server.logger = logger;

require("./serverConfig")(server);

// Create schema if it doesn't exist
// if ( !fs.existsSync("db.json"))
const recreateSchema = (server) => {
  logger.info("Removing existing db.json");
  if ( fs.existsSync("db.json"))
    fs.unlinkSync("db.json");

  logger.info("Creating new db.json");
  generateSchema(server);
};

// if ( !fs.existsSync("db.json"))
recreateSchema(server);

server.use(middlewares);

const getRouter = () => {
  const router = jsonServer.router('db.json');
  return router;
};

server.get('/gen', (req, res) => {
  recreateSchema(server);
  res.status(200).send("Schema Generated Successfully");

  server.use('/api', getRouter());
});

server.use('/api', getRouter());

require('./expressRoutes')(server);

const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '0.0.0.0';

server.listen(PORT, () => {
  logger.info(`Server is running at ${IP}:${PORT}`);
});