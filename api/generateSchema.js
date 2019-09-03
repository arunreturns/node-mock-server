const generateSchema = (server) => {
  const logger = server.logger;
  const jsf = require("json-schema-faker");
  const fs = require("fs");
  const path = require("path");
  const modelsPath = path.join(__dirname, "models");
  // Add faker to json-schema-faker
  jsf.extend("faker", () => {
    const faker = require("faker");
    const fakerCustoms = require('./custom/fakerCustoms');
    fakerCustoms(faker);
    return faker;
  });

  // Add chance to json-schema-faker
  jsf.extend("chance", () => {
    const Chance = require("chance");
    return new Chance();
  });

  const modelsList = fs.readdirSync(modelsPath);

  const schema = {
    type: "object",
    properties: {}
  };

  // Add properties
  const required = [];
  modelsList.forEach(model => {
    const schemaName = model.split(".")[0];
    if (schemaName !== "definitions") {
      required.push(schemaName);
      schema.properties[schemaName] = require(path.join(modelsPath, model));
    }
  });
  // Add definitions
  schema.definitions = require(path.join(modelsPath, "definitions"));
  // Add required schema
  schema.required = required;


  const generatedSchema = JSON.stringify(jsf.generate(schema), null, 2);
  fs.writeFileSync("./db.json", generatedSchema.toString());

  logger.info("Schema Generated Successfully");
  return generatedSchema;
}

module.exports = generateSchema;
