const dbBuckets = require("../../models/buckets");

const get = async (req, res, next) => {
  try {
    const findBucket = await dbBuckets.findById(req.params.id).lean();
    res.send({
      data: findBucket,
    });
  } catch (err) {
    console.error(err);
  }
}

const post = async (req, res, next) => {
  const body = req.body
  const date = new Date(req.body.date)
  const unixDate = date.getTime()
  await dbBuckets.findOneAndUpdate({_id: body.data._id}, {
    label: body.data.label,
    type: body.data.type,
    category: body.data.category,
    color: body.data.color,
    monthly: body.data.monthly,
    amount: body.data.amount,
    balance: body.data.balance,
    dateLimit: body.date,
    UNIXLimit: unixDate,
    targeted: body.data.targeted

  })
}


module.exports = {
  get,
  post,
};
