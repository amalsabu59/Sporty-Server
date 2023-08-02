const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

module.exports = mongoose.model("Address", AddressSchema);
