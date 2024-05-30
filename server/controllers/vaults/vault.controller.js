const dbVault = require("../../models/vaults");
const dbMonthlyVaults = require("../../models/monthlyVaults");
const dbTransactionsVaults = require("../../models/transactionsVaults");

const get = async (req, res, next) => {
  try {
    const month = req.params.month,
      formatedMonth = month < 10 ? `0${month}` : `${month}`;
    const dateFilter = new Date(`${req.params.year}-${formatedMonth}`);

    const findAllVault = await dbVault
      .find({ UNIXLimit: { $gt: (dateFilter.getTime()) }, archived: false})
      .lean();

    async function monthly(idVault, date) {
      const checkData = await dbMonthlyVaults
        .findOne({ vaultRef: idVault, date: date })
        .lean();

      if (checkData !== null) {
        return checkData;
      } else {
        await dbMonthlyVaults.create({
          vaultRef: idVault,
          assigned: 0,
          date: dateFilter,
          month: req.params.month,
          year: req.params.year,
        });
        return await dbMonthlyVaults
          .findOne({ vaultRef: idVault, date: date })
          .lean();
      }
    }

    async function transactionsMonthly(idVault, month, year) {
      const findTransactionsVault = await dbTransactionsVaults.find({
        vaultRef: idVault,
        month: month,
        year: year,
      });
      return findTransactionsVault;
    }


    async function transactionsVault(idVault) {
      const findTransactionsVault = await dbTransactionsVaults.find({
        vaultRef: idVault,
      });
      return findTransactionsVault;
    }

    async function prevTransactions(idVault) {
      const findPrevTrans = await dbTransactionsVaults.find({
        vaultRef: idVault,
        UNIXDate: { $lt: dateFilter.getTime() },
      });
      return findPrevTrans;
    }

    const mergedVault = await Promise.all(
      findAllVault.map(async (prevData) => ({
        ...prevData,
        monthly: await monthly(prevData._id, dateFilter),
        transactions: (await transactionsMonthly(prevData._id, req.params.month, req.params.year)
        ).reduce((total, item) => total + item.amount, 0),
        prevTransactions: (
          await prevTransactions(prevData._id)
        ).reduce((total, item) => total + item.amount, 0),
      }))
    );


    res.send({
      data: mergedVault,
    });
  } catch (err) {
    console.error(err);
  }
};

const post = async (req, res, next) => {};

module.exports = {
  get,
  post,
};
