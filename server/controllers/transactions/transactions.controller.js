const dbAccounts = require("../../models/accounts");
const dbBuckets = require("../../models/buckets");
const dbTransactions = require("../../models/transactions")

const get = async (req, res, next) => {
  const dataAccounts = await dbAccounts.find();
  res.send({
    dataAccounts,
  });
};

const post = async (req, res, next) => {
    if (req.body.options === true) {
      const newBalance = req.body.oldBalance + req.body.amount;
      await dbAccounts.findByIdAndUpdate(
        req.body.account,
        { balance: newBalance },
        { new: true }
      );
      await dbTransactions.create({
        label: req.body.label,
        amount: req.body.amount,
        date: req.body.date,
        accountRef: req.body.account,
      });
    } else {
      const newBalance = req.body.oldBalance - req.body.amount;
      await dbAccounts.findByIdAndUpdate(
        req.body.account,
        { balance: newBalance },
        { new: true }
      );
      await dbTransactions.create({
        label: req.body.label,
        amount: -req.body.amount,
        date: req.body.date,
        accountRef: req.body.account,
      });
    }
};

module.exports = {
  get,
  post,
};
