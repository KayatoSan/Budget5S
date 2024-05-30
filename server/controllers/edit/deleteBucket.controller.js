const dbBuckets = require('../../models/buckets')

const post = async (req, res, next) => {
    console.log(req.params.id, "was deleted")
    try {
        await dbBuckets.findByIdAndDelete(req.params.id)
        next()
    } catch (err) {
        console.error(err)
        next()
    }
};

module.exports = {
  post,
};
