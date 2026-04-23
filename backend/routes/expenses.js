const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add expense
router.post('/', auth, async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    
    if (!amount || !category) {
      return res.status(400).json({ message: 'Amount and category are required' });
    }
    
    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      date: date || Date.now(),
      note: note || '',
    });
    
    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update expense
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;
    
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, category, date, note },
      { new: true }
    );
    
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await expense.deleteOne();
    res.json({ message: 'Expense removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get category summary
router.get('/summary', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    
    const summary = {};
    let total = 0;
    
    expenses.forEach(expense => {
      summary[expense.category] = (summary[expense.category] || 0) + expense.amount;
      total += expense.amount;
    });
    
    res.json({ summary, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;