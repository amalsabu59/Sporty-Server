const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected Succesfully !"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(process.env.PORT || 8800, () => {
  console.log("backend server is running !");
});
