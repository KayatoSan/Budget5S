const dbTransactions = require("../../models/transactions");

const get = async (req, res, next) => {
    const data = await dbTransactions.find()
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
