const router = require("express").Router();
const User = require("../models/user");
const { accountSid, authToken, serviceSID } = require("../config");
const client = require("twilio")(accountSid, authToken);

// Endpoint to check if a user is present and send a response accordingly
router.post("/login", async (req, res) => {
  const { name, isAdmin, phone = "", email, isGoogleUser = false } = req.body;
  debugger;
  try {
    let itemToCheck = {};
    if (isGoogleUser && email) {
      itemToCheck = { email };
    } else if (!isGoogleUser && phone) {
      itemToCheck = { phone };
    }

    const existingUser = await User.findOne(itemToCheck);

    if (existingUser) {
      // If the user already exists, send a 200 response
      return res
        .status(200)
        .json({ message: "User exists", user: existingUser });
    } else {
      // If the user doesn't exist, add the user to the database
      const newUser = new User({
        name,
        isAdmin,
        phone,
        email,
        isGoogleUser,
      });

      // Save the new user to the database
      await newUser.save();

      // Send a 200
      res
        .status(200)
        .json({ message: "User added successfully", user: newUser });
    }
  } catch (err) {
    // In case of any error, send a 500 response with an error message
    res
      .status(500)
      .json({ error: "An error occurred while processing the request", err });
  }
});

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  console.log(phone, req.body);
  if (!phone)
    return res.status(301).json({ message: "Please enter a phone number" });
  try {
    // Download the helper library from https://www.twilio.com/docs/node/install
    const otp = Math.floor(1000 + Math.random() * 9000);
    await client.messages.create({
      from: "+17628001957",
      body: `Your otp for sport is ${otp}`,
      to: `+91${phone}`,
    });

    res.status(200).send({ message: "otp sucessfully sent", otp, phone });
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/update-name", async (req, res) => {
  try {
    const { id, name } = req.body;

    // Check if id and name are provided in the request body
    if (!id || !name) {
      return res
        .status(400)
        .json({ error: "Both 'id' and 'name' are required." });
    }

    // Find the user by the provided id and update the name field
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { name } },
      { new: true } // To return the updated document instead of the original one
    );

    // Check if the user with the provided id exists
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the updated user
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
