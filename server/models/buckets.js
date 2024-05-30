const mongoose = require("mongoose");

const buckets = new mongoose.Schema({
  label: { type: String, required: true },
  amount: { type: Number, default: 0, required: true },
  balance: { type: Number, required: false },
  defaultTarget: { type: Number, default: 0, required: true },
  creationDate: { type: Date, required: true },
  targeted: { type: Boolean, default: 0, required: false },
  dayDue: { type: String, required: false },
  type: { type: String, required: false }, //
  category: { type: String, required: false }, //
  dateLimit: { type: Date, required: false },
  UNIXLimit: {
    type: Number,
    required: true,
    default: 253636783200000 /* = 999/99/99 */,
  },
  note: { type: String, required: false }, //
  color: { type: String, required: false }, //
  icon: { type: String, required: false }, //
});


module.exports = mongoose.model("buckets", buckets);
