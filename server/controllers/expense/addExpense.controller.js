const dbAccounts = require("../../models/accounts");
const dbBuckets = require("../../models/buckets");
const dbTransactions = require("../../models/transactions");
const dbExpenses = require("../../models/expenses");

const get = async (req, res, next) => {
  const dataAccounts = await dbAccounts.find();
  const dataBuckets = await dbBuckets.find();
  res.send({
    dataAccounts,
    dataBuckets,
  });
};

const post = async (req, res, next) => {
  try {
    const account = await dbAccounts.findById(req.body.account);
    await dbAccounts.findByIdAndUpdate(
      req.body.account,
      { balance: account.balance - req.body.amount },
      { new: true }
    );
    await dbExpenses.create({
      label: req.body.label,
      amount: req.body.amount,
      date: req.body.date,
      bucketRef: req.body.bucket,
      accountRef: req.body.account
    });
    const bucket = await dbBuckets.findById(req.body.bucket)
    await dbBuckets.findByIdAndUpdate(req.body.bucket,
      {balance : bucket.balance - req.body.amount},
      {new : true}
  )
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  get,
  post,
};
