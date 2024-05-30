const mongoose = require("mongoose");

const monthlyBuckets = new mongoose.Schema({
  bucketRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "buckets",
    required: true,
  },
  assigned: { type: Number, required: true },
  month: { type: String, required: false },
  year: { type: String, required: false },
  date: { type: Date, required: true },
  UNIXDate: {type: Number, required: true},
  target: {type: Number, required: false},
});

monthlyBuckets.pre("save", function (next) {
    if (this.isNew) {
      const date = this.date;
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();
    }
    next();
  });
  
module.exports = mongoose.model("monthlybuckets", monthlyBuckets);