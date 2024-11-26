const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");


router.get("/", async (req, res) => {
  try {
    const staffs = await Staff.find(); 
    res.status(200).json(staffs); 
  } catch (error) {
    console.error("Error fetching staffs:", error);
    res.status(500).json({ message: "Failed to fetch staffs" });
  }
});

module.exports = router;
