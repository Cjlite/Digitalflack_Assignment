const Category = require("../models/Category");

// Get all categories for a user
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id }).populate(
      [{
      path: 'user',
      select: 'username email'
      },
      {
        path: 'categoryName',
        select: 'categoryName',
        options: { strictPopulate: true }
      }]
    );
    const categoriesCount = categories.length;
    res.json({categories, total: categoriesCount});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a specific category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({_id : id, user: req.user._id  });
    if (!category) throw Error('category not found');
    res.json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add a new category for a user
const addCategory = async (req, res) => {
  try {
    const { categoryName, description, status } = req.body;
    const userId = req.user._id;

    const newCategory = new Category({
      categoryName,
      description,
      status,
      user: userId,
    });

    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a category for a user
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;
    const { categoryName, description, status } = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId, user: userId },
      { categoryName, description, status  },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a category for a user
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;

    // Check if the category exists and belongs to the user
    const category = await Category.findOneAndDelete({
      _id: categoryId,
      user: userId,
    });

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json({ msg: "Category deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
