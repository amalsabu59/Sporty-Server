/** @format */

const router = require("express").Router();
const address = require("../models/address");

router.post("/:userId", async (req, res) => {
  try {
    //create new address
    const newAddress = new address({
      userId: req.params.userId,
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
    });
    const savedAddress = await newAddress.save();
    //save user return response
    const allAddresses = await address.find({
      userId: req.params.userId,
    });

    res.status(201).json(allAddresses);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const addressId = req.body._id;
    const userId = req.params.id;
    const updateData = {
      name: req.body.name,
      userId: userId,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
    };
    const updatedAddress = await address.findOneAndUpdate(
      { _id: addressId, userId: userId }, // Ensure address belongs to the user to prevent unauthorized update
      updateData,
      { new: true } // Return the updated address
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ error: "Address not found or unauthorized to update" });
    }

    const allAddresses = await address.find({
      userId: userId,
    });

    res.status(200).json(allAddresses);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.log(err);
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    console.time("Starting");
    const allShippingAddress = await address.find({
      userId: req.params.id,
    });
    console.timeEnd("Starting");
    res.status(200).json(allShippingAddress);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/delete/:id", async (req, res) => {
  try {
    const ship = await address.findByIdAndUpdate(req.params.id, {
      isDeleted: 1,
    });
    const allShipping = await address.find({
      isDeleted: 0,
    });

    res.status(200).json(allShipping);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
