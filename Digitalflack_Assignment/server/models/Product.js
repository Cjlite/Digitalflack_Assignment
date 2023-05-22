const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    packSize: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    mrp: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"],
    },
  }
);

module.exports = mongoose.model("Product", productSchema);
