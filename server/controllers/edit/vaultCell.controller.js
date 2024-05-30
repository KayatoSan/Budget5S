const dbMonthlyVaults = require("../../models/monthlyVaults");

const post = async (req, res, next) => {

  switch (req.body.field) {
    case "monthly.assigned":
      await dbMonthlyVaults.findByIdAndUpdate(
        req.body.id,
        { assigned: req.body.value },
        { new: true }
      );
      break;
    case "monthly.target":
      await dbMonthlyVaults.findByIdAndUpdate(
        req.body.id,
        {target: req.body.value},
        {new: true}
      );
      break;

    default:
      break;
  }
};

module.exports = {
  post,
};
