const dbAccounts = require("../../models/accounts");

const get = async (req, res, next) => {
  try {
    const data = await dbAccounts.findById(req.params.id);
    res.send({
      data,
    });
  } catch (err) {
    console.error(err);
  }
}

const post = async (req, res, next) => {
  const body = req.body
  try {
    await dbAccounts.findOneAndUpdate({_id: req.params.id}, {
      label: body.data.label,
      balance: body.data.balance,
    })
  } catch(err) {
    console.error(err)
  }

}


module.exports = {
  get,
  post,
};