const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "STAFF",
  },
  active: {
    type: Boolean,
    default: true, // Active status of the staff member
  },
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
