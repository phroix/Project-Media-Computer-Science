/*
  Credit Controller
  Requests for Credit Functions
*/
const db = require("../entity/index.entity");
const CreditEntity = db.credits;
const Op = db.Sequelize.Op;

//GET, find order by month and current User
exports.getCreditByDate = (req, res) => {
  const user_id = req.params.user_id;

  const date = req.query.date;
  var MyDate = new Date(date);
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() + "-" + ("0" + (MyDate.getMonth() + 1)).slice(-2);

  const currentDate = new Date(Date.now());
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  var condition = MyDate
    ? {
        date: { [Op.substring]: `%${MyDateString}%` },
        user_id: { [Op.eq]: user_id },
      }
    : {
        date: { [Op.substring]: `%${currentYear}-${currentMonth}-%` },
        user_id: { [Op.eq]: user_id },
      };

  CreditEntity.findAll({
    where: condition,
    attributes: [
      "credits_id",
      "date",
      "charged_amount",
      "old_amount",
      "new_amount",
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving credit.",
      });
    });
};
