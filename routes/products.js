const Products = require("../models/products");
const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    // Insert the dummy data into the database
    const products = await Products.insertMany(dummyData);
    res.status(201).json({ success: true, products });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ success: false, message: "Failed to add products" });
  }
});

//GET ALL Products

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {}
});
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.Category;
//   try {
//     let products;

//     if (qNew) {
//       products = await Products.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       products = await Products.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Products.find();
//     }
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
