module.exports = {
  "type": "array",
  "minItems": 10,
  "maxItems": 15,
  "items": {
    "type": "object",
    "properties": {
      id: {
        $ref: "#/definitions/positiveInt"
      },
      customerName: {
        "type": "string",
        "faker": "name.findName"
      },
      vehicleModel: {
        "type": "string",
        "faker": "name.jobArea"
      },
      serviceDate: {
        "type": "string",
        "faker": "date.future"
      },
      customerAddress: {
        $ref: "#/definitions/address"
      }
    },
    "required": [
      "id",
      "customerName",
      "vehicleModel",
      "serviceDate",
      "customerAddress"
    ]
  }
};
