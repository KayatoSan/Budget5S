const dbTransactionsVaults = require('../../models/transactionsVaults')

const post = async (req, res, next) => {
    try {
        await dbTransactionsVaults.findByIdAndDelete(req.params.id)
        console.log(req.params.id, "was deleted")
        next()
    } catch (err) {
        console.error(err)
        next()
    }
};

module.exports = {
  post,
};
