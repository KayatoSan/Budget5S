const dbAccounts = require("../../models/accounts");

const get = async (req, res, next) => {
    const data = await dbAccounts.find()
    res.send({
        data
    })
};

const post = async (req, res, next) => {
  try {
    await dbAccounts.create({
      label: req.body.data.label,
      balance: req.body.data.balance,
      creationDate: Date.now(),
    });
    res.redirect('/accounts/')
  } catch (err) {
    console.error(err);
  }
  
};

module.exports = {
  get,
  post,
};
