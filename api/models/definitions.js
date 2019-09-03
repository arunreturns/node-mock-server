module.exports = {
  positiveInt: {
    type: "integer",
    minimum: 0,
    exclusiveMinimum: true
  },
  randomNumber1To100: {
    type: "integer",
    minimum: 1,
    maximum: 100,
    exclusiveMinimum: true
  },
  address: {
    type: "object",
    properties: {
      "city": {
        "type": "string",
        "faker": "address.city"
      },
      "zipCode": {
        "type": "string",
        "faker": "address.zipCode"
      },
      "country": {
        "type": "string",
        "faker": "address.country"
      },
      "state": {
        "type": "string",
        "faker": "address.state"
      },
      "addressLine": {
        "type": "string",
        "faker": "address.streetAddress"
      }
    },
    "required": [
      "city",
      "zipCode",
      "country",
      "state",
      "addressLine"
    ]
  }
};
