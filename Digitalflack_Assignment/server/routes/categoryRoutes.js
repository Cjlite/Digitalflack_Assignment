const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {requireAuth} = require('../middleware/requireAuth');

router.post('/',requireAuth, categoryController.addCategory);
router.get('/', requireAuth, categoryController.getAllCategories);
router.get('/:id', requireAuth, categoryController.getCategoryById);
router.put('/:id', requireAuth, categoryController.updateCategory);
router.delete('/:id', requireAuth, categoryController.deleteCategory);

module.exports = router;
