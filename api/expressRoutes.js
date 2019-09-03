module.exports = (server) => {
  const jsonRouter = server.jsonRouter;
  const logger = require('../config/loggerConfig');
  const generateSchema = require('./generateSchema');

  server.get('/test', (req, res) => {
    res.status(200).send("Hello World");
  });

  server.get('/generate', (req, res) => {
    logger.info("Generating new schema")
    const db = generateSchema(server);
    jsonRouter.db.setState(JSON.parse(db));
    res.status(200).send("Schema Generated Successfully");
  });
};