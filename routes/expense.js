import express from "express";
import tokenConfig from "../middleware/tokenConfig";
import Expense from "../models/Expense";

const router = express.Router();

router.post("/add", tokenConfig, async (req, res) => {
  const { amount, category, date, description } = req.body;
  try {
    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      date,
      description,
    });

    await expense.save();
    res.status(201).json({ message: "Expense added!", expense });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/list", tokenConfig, async (req, res) => {
  try {
    const userId = req.user.id;
    const expense = await Expense.find({ user: userId });
    if (!expense)
      return res
        .status(404)
        .json({ message: "No expense found for this user" });

    res.status(200).json({ data: expense });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", tokenConfig, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await Expense.findOne({
      _id: expenseId,
      user: req.user.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    await ArchivedExpense.create(expense.toObject());
    await expense.deleteOne();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", tokenConfig, async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const filter = { _id: req.params.id, user: req.user.id };

    const update = {
      amount,
      category,
      date,
      description,
    };
    const expense = await Expense.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense updated", expense });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/summary", tokenConfig, async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $project: { category: $_id, total: 1, _id: 0 } },
    ]);
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
