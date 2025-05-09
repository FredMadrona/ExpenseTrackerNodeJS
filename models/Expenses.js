const mongoose = require('mongoose');  

const expenseSchema = mongoose.Schema(
    {
        item: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        category: { 
            type: String, 
            required: true,
            enum: ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Health', 'Education', 'Miscellaneous']
        },
    },
    { timestamps: true }
);

const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;
