const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {requireAuth} = require('../middleware/requireAuth');

router.post('/', productController.createProduct);
router.get('/',  productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',  productController.updateProductById);
router.delete('/:id',  productController.deleteProductById);

module.exports = router;
