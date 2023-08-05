const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cartId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    amountPaid: {
      type: Number,
    },
    addressId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrdersSchema);
