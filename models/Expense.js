import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Bills", "Health", "Other"],
    required: true,
  },
  date: { type: Date, default: Date.now },
  description: {
    type: String,
    trim: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Online", "Other"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Expense",expenseSchema)
