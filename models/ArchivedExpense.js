import mongoose from "mongoose";

const ArchivedExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model("ArchivedExpense", ArchivedExpenseSchema);
