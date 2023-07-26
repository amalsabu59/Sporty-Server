const router = require("express").Router();
const User = require("../models/user");

// Endpoint to check if a user is present and send a response accordingly
router.post("/login", async (req, res) => {
  const { name, isAdmin, phone, isAlreadySignedUp } = req.body;

  try {
    // Check if the user exists based on the provided criteria (e.g., name, phone, etc.)
    const existingUser = await User.findOne({ name, phone });

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

module.exports = router;
