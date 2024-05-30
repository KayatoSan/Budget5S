const dbBuckets = require("../../models/buckets");
const dbMonthlyBuckets = require("../../models/monthlyBuckets");
const dbExpenses = require("../../models/expenses");

const get = async (req, res, next) => {
  try {
    const month = req.params.month,
      formatedMonth = month < 10 ? `0${month}` : `${month}`;
    const dateFilter = new Date(req.params.year, formatedMonth - 1, 1);

    const findAllBucket = await dbBuckets
      .find({ $or: [
        { timeLimited: true, UNIXLimit: { $gt: dateFilter.getTime() } },
        { timeLimited: false },
        { timeLimited: null }
      ]})
      .lean();

    async function monthly(idBucket, date, defaultTarget) {
      const checkData = await dbMonthlyBuckets
        .findOne({ bucketRef: idBucket, date: date })
        .lean();
      if (checkData !== null) {
        return checkData;
      } else {
        await dbMonthlyBuckets.create({
          bucketRef: idBucket,
          assigned: 0,
          target: defaultTarget,
          date: dateFilter,
          UNIXDate: dateFilter.getTime(),
          month: req.params.month,
          year: req.params.year,
        });
        return await dbMonthlyBuckets
          .findOne({ bucketRef: idBucket, date: date })
          .lean();
      }
    }

    async function expense(idBucket) {
      const findExpense = await dbExpenses.find({
        bucketRef: idBucket,
        UNIXDate: dateFilter.getTime(),
      });
      return findExpense;
    }

    async function prevExpense(idBucket) {
      const findPrevExpense = await dbExpenses.find({
        bucketRef: idBucket,
        UNIXDate: { $lt: dateFilter.getTime() },
      });
      return findPrevExpense;
    }

    async function prevAssigned(idBucket) {
      const findPrevAssigned = await dbMonthlyBuckets.find({
        bucketRef: idBucket,
        UNIXDate: { $lt: dateFilter.getTime() },
      });
      return findPrevAssigned;
    }

    const mergedBucket = await Promise.all(
      findAllBucket.map(async (prevData) => ({
        ...prevData,
        monthly: await monthly(
          prevData._id,
          dateFilter,
          prevData.defaultTarget
        ),
        prevAssigned: (
          await prevAssigned(prevData._id)
        ).reduce((total, item) => total + item.assigned, 0),
        prevExpense: (
          await prevExpense(prevData._id)
        ).reduce((total, item) => total + item.amount, 0),
        expense: (
          await expense(prevData._id)
        ).reduce((total, item) => total + item.amount, 0),
      }))
    );
    res.send({
      data: mergedBucket,
    });
  } catch (err) {
    console.error(err);
  }
};

const post = async (req, res, next) => {
  if (req.body.timelimited === true) {
    try {
      await dbBuckets.create({
        label: req.body.label,
        balance: 0,
        UNIXLimit: new Date(req.body.date).getTime(),
        dateLimit: req.body.date,
        creationDate: Date.now(),
        archived: false,
        targeted: req.body.targeted,
        defaultTarget: req.body.target,
      });
    } catch (err) {
      console.error(err);
    }
  } else if (req.body.timelimited === false) {
    try {
      await dbBuckets.create({
        label: req.body.label,
        balance: 0,
        UNIXLimit: 253636783200000,
        creationDate: Date.now(),
        archived: false,
        targeted: req.body.targeted,
        defaultTarget: req.body.target,
      });
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = {
  get,
  post,
};
