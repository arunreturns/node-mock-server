module.exports = (faker) => {
  faker.locale = "en_IND";

  faker.custom = {
    licensePlateNumber: () => {
      const { state_abbr, country_code } = faker.definitions.address;
      return faker.random.arrayElement(state_abbr) + faker.random.number({ min: 11, max: 99, precision: 2 }) + "-" + faker.random.arrayElement(country_code) + "-" + faker.random.number({ min: 1000, max: 9999 });
    },
    carMake: () => {
      const carList = require('../data/car-list.json');
      const carInfo = faker.random.arrayElement(carList);
      const carBrand = carInfo.brand;
      const carMake = faker.random.arrayElement(carInfo.models);
      return `${carBrand} - ${carMake}`;
    }
  };
};