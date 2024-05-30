const dbTransactionsVault = require("../../models/transactionsVaults");

const get = async (req, res, next) => {
    const data = await dbTransactionsVault.find()
    res.send({
        data
    })
};

const post = async (req, res, next) => {
  
};

module.exports = {
  get,
  post,
};
