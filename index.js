const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected Succesfully !"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);

app.listen(process.env.PORT || 8800, () => {
  console.log("backend server is running !");
});
