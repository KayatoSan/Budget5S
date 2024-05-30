const mongoose = require("mongoose");

const transactionsVaults = new mongoose.Schema({
  label: { type: String, required: false },
  date: { type: Date, required: true },
  month: { type: String, required: false },
  year: { type: String, required: false },
  UNIXDate: { type: Number, required: false },
  amount: { type: Number, required: true },
  vaultRef: { type: mongoose.Schema.Types.ObjectId, ref: "buckets" },
  accountRef: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
});

transactionsVaults.pre("save", function (next) {
  if (this.isNew) {
    const date = this.date;
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.UNIXDate = new Date(this.year, this.month, "1");
  }
  next();
});

module.exports = mongoose.model("transactionsvaults", transactionsVaults);
