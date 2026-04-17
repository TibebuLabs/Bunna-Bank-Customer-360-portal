const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  searchCustomers,
  getCustomer,
  getTransactions,
  getSummary,
} = require('../controllers/customerController');

// All customer routes require authentication
router.use(protect);

router.get('/search',                    searchCustomers);
router.get('/summary',                   getSummary);
router.get('/:accountNo',                getCustomer);
router.get('/:accountNo/transactions',   getTransactions);

module.exports = router;
