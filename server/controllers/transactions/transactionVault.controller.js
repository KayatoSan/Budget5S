const dbAccounts = require("../../models/accounts");
const dbVaults = require("../../models/vaults");
const dbTransactions = require("../../models/transactions");
const dbTransactionsVault = require("../../models/transactionsVaults");

const get = async (req, res, next) => {
  const dataAccounts = await dbAccounts.find();
  const dataVaults = await dbVaults.find();
  res.send({
    dataAccounts,
    dataVaults,
  });
};

const post = async (req, res, next) => {
  try {
    // Update the source account
    await dbAccounts.findByIdAndUpdate(
      req.body.sourceAccount,
      { $inc: { balance: -req.body.amount } },
      { new: true }
    );
    // Update the linked account to the vault
    await dbAccounts.findByIdAndUpdate(
      req.body.accountLinked,
      { $inc: { balance: req.body.amount } },
      { new: true }
    );
    // Update the balance of the vault for non-monhtly type
    await dbVaults.findByIdAndUpdate(req.body.vault, {
      $inc: { balance: req.body.amount },
    });
    await dbTransactionsVault.create({
      label: req.body.label,
      amount: req.body.amount,
      date: req.body.date,
      vaultRef: req.body.vault,
      accountRef: req.body.accountLinked,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  get,
  post,
};
