const Expense = require("../../models/Expenses.js");
const moment = require("moment");

const categoryEnum = [
  'Food',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Health',
  'Education',
  'Miscellaneous'
];

const viewExpenseController = async (req, res, next) => {
  try {
    const expense = await Expense.find({}).sort({ createdAt: -1 });
    res.locals.moment = moment;

    res.render("index", {
      title: "Expenses",
      expense,
      categories: categoryEnum
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addExpenseController = async (req, res, next) => {
  const { item, amount, date, category } = req.body;
  try {
    const newExpense = new Expense({
      item,
      amount,
      date,
      category,
    });
    await newExpense.save();

    res.status(200).json({ message: "Expense added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpenseController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const { item, amount, date, category } = req.body;
    expense.item = item;
    expense.amount = amount;
    expense.date = date;
    expense.category = category;
    await expense.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateExpenseFormController = async (req, res, next) => {
  try {
    const { id } = req.query;
    const expense = await Expense.findById(id);

    res.render("updateExpense", { title: "Update expense", expense, categories: categoryEnum });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpenseController = async (req, res, next) => {
  try {
    const { id, confirm } = req.query;

    if (confirm === "yes") {
      await Expense.findByIdAndDelete(id);
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpensePageController = (req, res, next) => {
  const { id } = req.query;
  res.render("deleteExpense", { title: "Delete Expense", id });
}

const confirmDeleteExpenseController = async (req, res, next) => {
  try {
    const { id, confirm } = req.query;

    if (confirm === "yes") {
      await Expense.findByIdAndDelete(id);
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { 
  viewExpenseController, 
  addExpenseController, 
  updateExpenseFormController, 
  updateExpenseController, 
  deleteExpensePageController, 
  deleteExpenseController,
  confirmDeleteExpenseController
};
