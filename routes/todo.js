const express = require("express");
const router = express.Router();
const todo = require("../controllers/todoControllers/todoController");
const expense = require("../controllers/expenseControllers/ExpenseController");

router.get("/", expense.viewExpenseController);

router.post("/add-expense/:id", expense.addExpenseController);

router.post("/update-expense/:id", expense.updateExpenseController);

router.get("/update-expense", expense.updateExpenseFormController);

router.post("/update-expense/:id", expense.updateExpenseFormController);

router.get("/delete-expense", expense.deleteExpensePageController);

router.get("/view-todo", todo.viewTodoController);

router.get("/add-todo", todo.addTodoFormController);

router.get("/delete-todo", todo.deleteTodoPageController);

router.post("/add-todo", todo.addTodoController);

router.post("/update-todo/:id", todo.updateTodoController);

router.get("/update-todo", todo.updateTodoFormController);

router.get("/confirm-delete", todo.deleteTodoController);

router.get("/confirm-deleteExpense", expense.confirmDeleteExpenseController);

module.exports = router;
