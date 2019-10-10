const generateSchema = server => {
  const logger = server.logger;
  const jsf = require("json-schema-faker");
  const fs = require("fs");
  const path = require("path");
  const modelsPath = path.join(__dirname, "models");
  const staticJSONPath = path.join(__dirname, "static");
  // Add faker to json-schema-faker
  jsf.extend("faker", () => {
    const faker = require("faker");
    const fakerCustoms = require("./custom/fakerCustoms");
    fakerCustoms(faker);
    return faker;
  });

  // Add chance to json-schema-faker
  jsf.extend("chance", () => {
    const Chance = require("chance");
    return new Chance();
  });

  const modelsList = fs.readdirSync(modelsPath);
  const staticJSONList = fs.readdirSync(staticJSONPath);

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

  const jsfGeneratedSchema = jsf.generate(schema);
  console.log(jsfGeneratedSchema);
  // logger.info("Static JSONs " + staticJSONList);
  // Add static JSON to the schema
  staticJSONList.forEach(staticJSON => {
    const jsonFileName = staticJSON.split(".")[0];
    jsfGeneratedSchema[jsonFileName] = require(path.join(
      staticJSONPath,
      staticJSON
    ));
  });
  // console.log(jsfGeneratedSchema);
  const generatedSchema = JSON.stringify(jsfGeneratedSchema, null, 2);
  fs.writeFileSync("db.json", generatedSchema.toString());

  logger.info("Schema Generated Successfully");
  return generatedSchema;
};

module.exports = generateSchema;
