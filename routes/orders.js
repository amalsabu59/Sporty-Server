const Products = require("../models/products");
const router = require("express").Router();
const Orders = require("../models/orders");
const Cart = require("../models/cart");

router.post("/checkout", async (req, res) => {
  debugger;
  const { userId, addressId, paymentStatus, paymentId, amountPaid } = req.body;
  try {
    let findCart = await Cart.findOne({ userId, isOrdered: false });

    const cartId = findCart._id;

    let findOrder = await Orders.findOne({ cartId });

    if (!findOrder) {
      const order = new Orders({
        userId,
        addressId,
        cartId,
        paymentStatus,
        paymentId,
        amountPaid,
      });
      await order.save();
      if (paymentStatus === "captured") {
        const deletedCart = await Cart.deleteOne({ _id: cartId });
        if (deletedCart.deletedCount === 1) {
          console.log("Cart deleted successfully");
        } else {
          console.log("Cart not found or could not be deleted");
        }
      }

      res.status(200).json(order);
    } else {
      res.status(200).json({ msg: "order already exists" });
    }
    // If the cart does not exist, create a new one with the provided data

    // getCartProducts(req, res, userId);
  } catch (err) {
    res.status(500).json({ error: "Failed to add/update cart" });
  }
});

//GET ALL Products

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {}
});

module.exports = router;
