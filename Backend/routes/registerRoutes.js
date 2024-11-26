const express = require("express");
const bcrypt = require("bcrypt");
const Staff = require("../models/Staff");
const User = require("../models/User");

const router = express.Router();

// Route for regular user registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Route for admin (staff) registration
router.post("/admin/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    // Here, ensure that the role is STAFF and not user, for admin registration
    if (role !== "STAFF") {
      return res.status(400).json({ error: "Role must be STAFF for admin registration." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ name, email, password: hashedPassword, role });
    await newStaff.save();
    res.status(201).json({ message: "Staff account created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
