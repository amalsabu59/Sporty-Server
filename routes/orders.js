const router = require("express").Router();
const Products = require("../models/products");
const Orders = require("../models/orders");
const Cart = require("../models/cart");
const Address = require("../models/address");

const getOrders = async (req, res, userId) => {
  try {
    // Find all the orders for the user from the Orders collection
    const orders = await Orders.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "User's orders not found." });
    }

    // Create an array to store all the order details
    const ordersWithProducts = [];

    // Loop through each order and get the cart products
    for (const order of orders) {
      const cart = await Cart.findOne({ _id: order.cartId, isOrdered: true });

      if (!cart) {
        // If the cart is not found, skip this order
        continue;
      }

      const finalProduct = [];

      for (const product of cart.products) {
        const productsInCart = await Products.find({
          _id: { $in: [product.productId] },
        });

        // console.log(productsInCart[0]);
        const products = {
          id: productsInCart[0]._id,
          title: productsInCart[0].title,
          img: productsInCart[0].img,
          price: productsInCart[0].price,
          quantity: product.quantity,
          size: product.size,
        };
        finalProduct.push(products);
      }

      // Fetch address information based on the addressId in the order
      const address = await Address.findOne({ _id: order.addressId });

      // Combine the order details, products in cart, and address for the final result
      ordersWithProducts.push({
        orderDetails: order,
        products: finalProduct,
        address: address, // Add the address information
      });
    }

    res.status(200).json(ordersWithProducts);
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

router.post("/checkout", async (req, res) => {
  const {
    userId,
    addressId,
    paymentStatus,
    paymentId,
    amountPaid,
    isReordering = false,
    cartIdForReordering,
  } = req.body;
  try {
    debugger;
    let findCart = await Cart.findOne({ userId, isOrdered: false });

    let cartId = "";

    if (findCart) cartId = findCart._id;

    if (isReordering) cartId = cartIdForReordering;

    // let findOrder = await Orders.findOne({ cartId });

    // if (!findOrder) {
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
      const findCartAndUpdateIsOrdered = await Cart.findByIdAndUpdate(cartId, {
        isOrdered: true,
      });

      // const deletedCart = await Cart.deleteOne({ _id: cartId });
      // if (deletedCart.deletedCount === 1) {
      //   console.log("Cart deleted successfully");
      // } else {
      //   console.log("Cart not found or could not be deleted");
      // }
    }

    getOrders(req, res, userId);
    // } else {
    //   res.status(200).json({ msg: "order already exists" });
    // }
    // If the cart does not exist, create a new one with the provided data

    // getCartProducts(req, res, userId);
  } catch (err) {
    res.status(500).json({ error: "Failed to add/update cart" });
  }
});

// ... (other parts of the code)

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  getOrders(req, res, userId);
});

module.exports = router;
