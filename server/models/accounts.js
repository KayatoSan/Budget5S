const mongoose = require("mongoose");

const accounts = new mongoose.Schema({
  label: { type: String, required: true },
  balance: { type: Number, required: true },
  clearBalance: { type: Number, required: false },
  unClearBalance: { type: Number, required: false },
  currency: { type: String, required: false },
  creationDate: { type: Date, required: true },
  transactionsLinked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transactions",
    },
  ],
  color: { type: String, required: false }, // FOR THE STYLE
  icon: { type: String, required: false }, // FOR THE STYLE
  assignable: {type: Boolean, required: false, default: true}
});

module.exports = mongoose.model("accounts", accounts);
