const Customer = require('../models/Customer');

// GET /api/customers/search?q=...
const searchCustomers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters.' });
    }
    const customers = await Customer.search(q);
    res.json({ customers, count: customers.length });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Search failed.' });
  }
};

// GET /api/customers/:accountNo
const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByAccountNo(req.params.accountNo);
    if (!customer) return res.status(404).json({ message: 'Customer not found.' });
    res.json({ customer });
  } catch (err) {
    console.error('Get customer error:', err);
    res.status(500).json({ message: 'Failed to fetch customer.' });
  }
};

// GET /api/customers/:accountNo/transactions
const getTransactions = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const transactions = await Customer.getTransactions(req.params.accountNo, parseInt(limit));
    res.json({ transactions, count: transactions.length });
  } catch (err) {
    console.error('Transactions error:', err);
    res.status(500).json({ message: 'Failed to fetch transactions.' });
  }
};

// GET /api/customers/summary
const getSummary = async (req, res) => {
  try {
    const summary = await Customer.getSummary();
    res.json({ summary });
  } catch (err) {
    console.error('Summary error:', err);
    res.status(500).json({ message: 'Failed to fetch summary.' });
  }
};

module.exports = { searchCustomers, getCustomer, getTransactions, getSummary };
