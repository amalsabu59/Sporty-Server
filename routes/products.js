const Products = require("../models/products");
const router = require("express").Router();

const dummyData = [
  {
    title: "Men's Shoes",
    desc: "High-performance shoes",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_1.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_2.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_3.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "1https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_4.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
    ],
    categories: ["Men", "Shoes"],
    size: ["S", "M", "L", "XL"],
    price: 89.99,
    inStock: true,
    rating: [4],
  },
  {
    title: "Women's Leggings",
    desc: "Comfortable and yoga ",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_1.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_2.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
    ],
    categories: ["Women", "Sportswear"],
    size: ["XS", "S", "M", "L", "XL"],
    price: 39.95,
    inStock: true,
    rating: [3],
  },
  {
    title: "Children's Jersey",
    desc: "Official soccer jersey ",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_1.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_2.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_3.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_4.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
    ],
    categories: ["Children", "Jerseys"],
    size: ["XS", "S", "M"],
    price: 24.99,
    inStock: false,
    rating: [2],
  },
  {
    title: "Women's Leggings",
    desc: "Comfortable and yoga ",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_1.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_2.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
    ],
    categories: ["Women", "Sportswear"],
    size: ["XS", "S", "M", "L", "XL"],
    price: 39.95,
    inStock: true,
    rating: [5],
  },
  {
    title: "Men's Shoes",
    desc: "High-performance shoes",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_1.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_2.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_3.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "1https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_4.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
    ],
    categories: ["Men", "Shoes"],
    size: ["S", "M", "L", "XL"],
    price: 89.99,
    inStock: true,
    rating: [1],
  },
  {
    title: "Women's Leggings",
    desc: "Comfortable and yoga ",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_1.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_2.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
    ],
    categories: ["Women", "Sportswear"],
    size: ["XS", "S", "M", "L", "XL"],
    price: 39.95,
    inStock: true,
    rating: [2],
  },
  {
    title: "Children's Jersey",
    desc: "Official soccer jersey ",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_1.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_2.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_3.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/gym_pant_4.png?alt=media&token=c6ac02b6-09e1-4359-a9f5-7b729efa4977/mens-shoes-1.jpg",
    ],
    categories: ["Children", "Jerseys"],
    size: ["XS", "S", "M"],
    price: 24.99,
    inStock: false,
    rating: [2],
  },
  {
    title: "Women's Leggings",
    desc: "Comfortable and yoga ",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_1.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
      "https://firebasestorage.googleapis.com/v0/b/sporty-e9707.appspot.com/o/tshirt_2.png?alt=media&token=3aef1e7d-56b4-494f-b1ae-a20dba93b2ae",
    ],
    categories: ["Women", "Sportswear"],
    size: ["XS", "S", "M", "L", "XL"],
    price: 39.95,
    inStock: true,
    rating: [2],
  },
];

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

// Endpoint to update ratings and add reviews
router.post("/update-ratings/:productId", async (req, res) => {
  const { productId } = req.params;
  const { rating, review } = req.body;

  try {
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update ratings array
    if (typeof rating === "number") {
      product.rating.push(rating);
    }

    // Add review to reviews array
    if (typeof review === "string") {
      product.reviews.push(review);
    }

    await product.save();

    return res
      .status(200)
      .json({ message: "Rating and review updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
