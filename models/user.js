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
      unique: true,
    },
    email: {
      type: String,
    },
    isGoogleUser: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
