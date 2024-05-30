const mongoose = require("mongoose");

const monthlyVaults = new mongoose.Schema({
  vaultRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vaults",
    required: true,
  },
  assigned: { type: Number, required: true },
  month: { type: String, required: false },
  year: { type: String, required: false },
  date: { type: Date, required: true },
});

monthlyVaults.pre("save", function (next) {
    if (this.isNew) {
      const date = this.date;
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();
    }
    next();
  });
  
module.exports = mongoose.model("monthlyvaults", monthlyVaults);
