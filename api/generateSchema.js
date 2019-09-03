const generateSchema = (server) => {
  const logger = server.logger;
  const jsf = require("json-schema-faker");
  const fs = require("fs");
  const path = require("path");
  const modelsPath = path.join(__dirname, "models");
  // Add faker to json-schema-faker
  jsf.extend("faker", () => {
    const faker = require("faker");
    faker.locale = "en_IND";

    faker.custom = {
      licensePlateNumber: () => {
        return faker.random.arrayElement(faker.definitions.address.state_abbr) + faker.random.number({ min: 11, max: 99, precision: 2 }) + "-" + faker.random.arrayElement(faker.definitions.address.country_code) + "-" + faker.random.number({ min: 1000, max: 9999 });
      },
      carMake: () => {
        const carList = require('./data/car-list.json');
        const carInfo = faker.random.arrayElement(carList);
        const carBrand = carInfo.brand;
        const carMake = faker.random.arrayElement(carInfo.models);
        return `${carBrand} - ${carMake}`;
      }
    };

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
