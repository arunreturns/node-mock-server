module.exports = server => {
  const jsonRouter = server.jsonRouter;
  const logger = require("../config/loggerConfig");
  const generateSchema = require("./generateSchema");
  const fs = require("fs");
  const path = require("path");

  server.get("/generate", (req, res) => {
    logger.info("Generating new schema");
    const db = generateSchema(server);
    jsonRouter.db.setState(JSON.parse(db));
    res.status(200).send("Schema Generated Successfully");
  });

  server.get("/file", (req, res) => {
    const { filePath } = req.query;
    logger.info("Getting " + filePath);
    try {
      const fileContent = fs.readFileSync(
        path.join(__dirname, ...filePath.split("/")),
        "utf8"
      );
      res.status(200).send(JSON.stringify(fileContent.toString()));
    } catch (e) {
      logger.error(e);
      res.status(500).send(e.toString());
    }
  });

  server.delete("/file", (req, res) => {
    const { filePath } = req.query;
    logger.info("Getting " + filePath);
    try {
      fs.unlinkSync(path.join(__dirname, ...filePath.split("/")));
      res.status(200).send(`${filePath} removed successfully`);
    } catch (e) {
      logger.error(e);
      res.status(500).send(e.toString());
    }
  });

  server.post("/file", (req, res) => {
    const { filePath } = req.query;
    logger.info("Getting " + filePath);
    try {
      const { fileContent } = req.body;
      fs.writeFileSync(
        path.join(__dirname, ...filePath.split("/")),
        fileContent
      );
      res.status(200).send(`${filePath} updated successfully`);
    } catch (e) {
      logger.error(e);
      res.status(500).send(e.toString());
    }
  });
};
