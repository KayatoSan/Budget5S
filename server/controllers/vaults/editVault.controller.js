const dbVaults = require("../../models/vaults");
const dbAccounts = require("../../models/accounts");

const get = async (req, res, next) => {
  try {
    const dataVaults = await dbVaults.findById(req.params.id);
    const dataAccounts = await dbAccounts.findById(dataVaults.accountLinked);
    const listAccounts = await dbAccounts.find()
    res.send({
      dataVaults,
      dataAccounts,
      listAccounts,
    });
  } catch (err) {
    console.error(err);
  }
}

const post = async (req, res, next) => {
  const body = req.body.data
  const date = new Date(body.date)
  const unixDate = date.getTime()
  await dbVaults.findOneAndUpdate({_id: req.params.id}, {
    label: body.label,
    accountLinked: body.accountLinked,
    monthlyType: body.monthly,
    dateDue: date,
    UNIXLimit: 253636783200000,
  }) 
}


module.exports = {
  get,
  post,
};