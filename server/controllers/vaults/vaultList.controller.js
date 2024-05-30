const dbVaults = require("../../models/vaults");

const get = async (req, res, next) => {
    const data = await dbVaults.find()
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
