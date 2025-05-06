const express = require('express');
const router = express.Router();
const { Transaction } = require('../models/Transaction'); // Assuming a Transaction model is defined

// Add a new transaction
router.post('/', async (req, res) => {
    try {
        const { amount, category, date, notes } = req.body;
        const transaction = new Transaction({ amount, category, date, notes });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add transaction' });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Update a transaction
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, date, notes } = req.body;
        const transaction = await Transaction.findByIdAndUpdate(id, { amount, category, date, notes }, { new: true });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update transaction' });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});

module.exports = router;