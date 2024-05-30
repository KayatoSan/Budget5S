const dbTransactions = require('../../models/transactions')

const post = async (req, res, next) => {
    try {
        await dbTransactions.findByIdAndDelete(req.params.id)
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
