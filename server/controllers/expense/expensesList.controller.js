const dbExpenses = require("../../models/expenses");

const get = async (req, res, next) => {
    const data = await dbExpenses.find()
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
