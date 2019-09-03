module.exports = (server) => {
  const logger = server.logger;
  const jsf = require("json-schema-faker");
  const fs = require("fs");
  const path = require("path");
  const schemaPath = path.join(__dirname, "schema");
  // Add faker to json-schema-faker
  jsf.extend("faker", () => {
    const faker = require("faker");
    faker.locale = "en_IND";

    faker.custom = {
      licensePlateNumber: () => {
        return faker.random.arrayElement(faker.definitions.address.state_abbr) + faker.random.number({min: 11, max: 99, precision: 2}) + "-" + faker.random.arrayElement(faker.definitions.address.country_code) + "-" + faker.random.number({min: 1000, max: 9999});
      }
    };

    return faker;
  });

  // Add chance to json-schema-faker
  jsf.extend("chance", () => {
    const Chance = require("chance");
    return new Chance();
  });

  const dirList = fs.readdirSync(schemaPath);

  const schema = {
    type: "object",
    properties: {}
  };

  // Add properties
  const required = [];
  dirList.forEach(dir => {
    const schemaName = dir.split(".")[0];
    if (schemaName !== "definitions") {
      required.push(schemaName);
      schema.properties[schemaName] = require(path.join(schemaPath, dir));
    }
  });
  // Add definitions
  schema.definitions = require(path.join(schemaPath, "definitions"));
  // Add required schema
  schema.required = required;


  const generatedSchema = JSON.stringify(jsf.generate(schema), null, 2);
  fs.writeFileSync("./db.json", generatedSchema.toString());

  logger.info("Schema Generated Successfully");
};
