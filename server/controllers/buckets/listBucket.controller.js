const dbBuckets = require("../../models/buckets");

const get = async (req, res, next) => {
    const data = await dbBuckets.find()
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
