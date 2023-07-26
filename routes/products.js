const Products = require("../models/products");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const newProduct = new Products(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCTS
router.get("/find/:id", async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.Category;
  try {
    let products;

    if (qNew) {
      products = await Products.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Products.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Products.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
