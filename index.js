const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const addressRoutes = require("./routes/address");
const razorpayRoutes = require("./routes/razorpay");
dotenv.config();
app.use(express.json());
app.use(cors());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("DB Connected Succesfully !"))
//   .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/address", addressRoutes);
app.use("/payment", razorpayRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully !");
    app.listen(process.env.PORT || 8800, () => {
      console.log("backend server is running !");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the application with an error code
  });
