const router = require("express").Router();
const Cart = require("../models/cart");
const Products = require("../models/products");

const getCartProducts = async (req, res, userId) => {
  try {
    // Find the cart with the given userId
    const cart = await Cart.findOne({ userId, isOrdered: false }).lean().exec();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const productIds = cart.products.map((product) => product.productId);

    // Find the products in the "Product" collection based on the productIds in the cart
    const products = await Products.find({ _id: { $in: productIds } })
      .lean()
      .exec();

    // Merge the cart and product data to get the final cart products
    const cartProducts = cart.products.map((productInCart) => {
      const productData = products.find(
        (product) => product._id.toString() === productInCart.productId
      );
      return {
        ...productInCart,
        details: productData,
      };
    });

    return res.json(cartProducts);
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
// Assuming you have already required the necessary modules and initialized the router

// Endpoint to add or update cart
router.post("/add-cart", async (req, res) => {
  const { userId, products } = req.body;
  try {
    let cart = await Cart.findOne({ userId, isOrdered: false });

    if (cart) {
      // If the cart exists, update it with the new products data
      cart.products = products;
      await cart.save();
    } else {
      // If the cart does not exist, create a new one with the provided data
      cart = new Cart({ userId, products });
      await cart.save();
    }
    getCartProducts(req, res, userId);
    // res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add/update cart" });
  }
});

// Endpoint to get cart products
router.get("/get-cart/:userId", async (req, res) => {
  const userId = req.params.userId; // Use req.params.userId to get the userId from URL parameters
  getCartProducts(req, res, userId);
});

module.exports = router;
