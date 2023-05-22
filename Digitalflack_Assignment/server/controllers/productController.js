const Product = require("../models/Product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { productName, packSize, mrp, status, image, category } = req.body;

    const newProduct = new Product({
      productName,
      packSize,
      mrp,
      status,
      image,
      category,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", mission: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Product by ID
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { productName, packSize, mrp, status, image, category } = req.body;

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { productName, packSize, mrp, status, image, category },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updateProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all product
exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find().populate({
      path: 'category',
      select: 'categoryName description'
    });;
    const productCount = product.length;
    res.json({ product, total: productCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({_id : id });
    if (!product) throw Error('product not found');
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
