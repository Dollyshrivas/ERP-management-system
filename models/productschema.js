const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Role: { type: String, required: true },
    Price: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productschema", productSchema);
