const express = require('express');
const { 
    getAllItems, 
    getItemById, 
    createItem, 
    updateItem, 
    deleteItem 
} = require('../controllers/itemController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../utils/multerConfig'); // Assuming multer is configured for image uploads

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', authenticateToken, upload.single('image'), createItem);
router.put('/:id', authenticateToken, updateItem);
router.delete('/:id', authenticateToken, authorizeRoles(['admin', 'owner']), deleteItem);

module.exports = router;
