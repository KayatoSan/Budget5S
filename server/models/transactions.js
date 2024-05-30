const mongoose = require("mongoose");

const transactions = new mongoose.Schema({
  accountRef: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  label: { type: String, required: false },
  amount: { type: Number, required: true },
  currency: { type: String, required: false },
  date: { type: Date, required: true },
  month: { type: String, required: false },
  year: { type: String, required: false },
  UNIXDate: { type: Number, required: false },
  color: { type: String, required: false }, // FOR THE STYLE
  icon: { type: String, required: false }, // FOR THE STYLE
});

transactions.pre("save", function (next) {
  if (this.isNew) {
    const date = this.date;
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.UNIXDate = new Date(this.year, this.month, "1");
  }
  next();
});

module.exports = mongoose.model("transactions", transactions);
