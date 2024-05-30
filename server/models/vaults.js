const mongoose = require("mongoose");

const vaults = new mongoose.Schema({
  label: { type: String, required: true },
  accountLinked: { type: mongoose.Schema.Types.ObjectId, ref: "accounts" },
  monthlyType: { type: Boolean, required: true },
  dateLimit: { type: Date, required: false },
  UNIXLimit: {
    type: Number,
    required: false,
    default: 253636783200000 /* = 999/99/99 */,
  },
  dateDue: { type: Date, required: false },
  dayDue: { type: Number, required: false },
  amount: { type: Number, required: false },
  balance: { type: Number, required: true },
  target: { type: Number, required: false },
  archived: {type: Boolean, required: true},
});


module.exports = mongoose.model("vaults", vaults);
