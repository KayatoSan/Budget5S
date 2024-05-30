const mongoose = require("mongoose");

const expenses = new mongoose.Schema({
  label: { type: String, required: false },
  date: { type: Date, required: true },
  month: { type: String, required: false },
  year: { type: String, required: false },
  amount: { type: Number, required: true },
  bucketRef: { type: mongoose.Schema.Types.ObjectId, ref: "buckets" },
  accountRef: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  UNIXDate: { type: Number, required: false },
});

expenses.pre("save", function (next) {
  if (this.isNew) {
    const date = this.date;
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.UNIXDate = new Date(date.getFullYear(), date.getMonth(), "1");
  }
  next();
});

module.exports = mongoose.model("expenses", expenses);
