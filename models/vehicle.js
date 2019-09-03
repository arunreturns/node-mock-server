module.exports = {
  "type": "array",
  "minItems": 10,
  "maxItems": 15,
  "uniqueItems": true,
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
      vehicleNumber: {
        "type": "string",
        "faker": "custom.licensePlateNumber"
      },
      serviceDate: {
        "type": "string",
        "faker": "date.future"
      },
      customerAddress: {
        $ref: "#/definitions/address"
      },
      assignedTo: {
        "type": "string",
        "chance": {
          "pickone": [
            [
              "Mechanic",
              "RepairMan",
              "ServiceManager",
              "Completed",
              "Unassigned"
            ]
          ]
        }
      }
    },
    "required": [
      "id",
      "customerName",
      "vehicleNumber",
      "serviceDate",
      "customerAddress",
      "assignedTo"
    ]
  }
};