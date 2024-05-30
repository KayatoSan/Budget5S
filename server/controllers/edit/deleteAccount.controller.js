const dbAccounts = require('../../models/accounts')

const post = async (req, res, next) => {
    console.log(req.params.id, "was deleted")
    try {
        await dbAccounts.findByIdAndDelete(req.params.id)
        next()
    } catch (err) {
        console.error(err)
        next()
    }
};

module.exports = {
  post,
};
