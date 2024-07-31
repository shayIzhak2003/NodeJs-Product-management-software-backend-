const express = require('express');
const { addProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addProduct);
router.get('/:id?', authMiddleware, getProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
