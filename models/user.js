const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    phone: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("login", UserSchema);
