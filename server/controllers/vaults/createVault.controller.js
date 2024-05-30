const dbAccounts = require("../../models/accounts");
const dbVaults = require("../../models/vaults");

const get = async (req, res, next) => {
  const dataAccounts = await dbAccounts.find();
  res.send({
    dataAccounts,
  });
};

const post = async (req, res, next) => {
    try {
      await dbVaults.create({
        label: req.body.label,
        balance: 0,
        UNIXLimit: 253636783200000,
        dateDue: req.body.dateDue,
        creationDate: Date.now(),
        archived: false,
        accountLinked: req.body.accountLinked,
        monthlyType: req.body.monthlyType,
        dateDue: req.body.dateDue,
        target: req.body.target,
      });
    } catch (err) {
      console.error(err);
    }
};

module.exports = {
  get,
  post,
};
