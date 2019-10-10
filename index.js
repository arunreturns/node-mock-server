const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router("db.json");
const generateSchema = require("./api/generateSchema");
const logger = require("./config/loggerConfig");
const fs = require("fs");

server.logger = logger;
server.jsonRouter = router;

require("./config/serverConfig")(server);

if (!fs.existsSync("db.json")) {
  const db = generateSchema(server);
  router.db.setState(JSON.parse(db));
}

server.use(middlewares);
server.use("/api", router);

require("./api/expressRoutes")(server);

const { PORT = 4000, IP = "0.0.0.0" } = process.env;

server.listen(4000, () => {
  logger.info(`Server is running at ${IP}:${PORT}`);
});
