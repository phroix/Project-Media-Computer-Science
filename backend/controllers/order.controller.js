/*
  Order Controller
  Requests for Order Functions
*/
const db = require("../entity/index.entity");
const OrderEntity = db.orders;
const ContainEntity = db.conatins;
const UserEntity = db.users;
const ProductEntity = db.products;
const Op = db.Sequelize.Op;

//POST, create order and save in db
exports.createOrder = (req, res) => {
  var currentOrderId = null;
  //create a order
  const order = {
    date: new Date(Date.now()),
    user_id: req.params.user_id,
  };
  OrderEntity.create(order)
    .then((data1) => {
      currentOrderId = data1.order_id;
      res.send(data1);

      const containsOrder = {
        order_id: currentOrderId,
        product_id: null,
        product_name: "",
        product_costs: "",
        quantity: null,
      };

      req.body.forEach((jsonArray) => {
        containsOrder.product_id = jsonArray.product_id;
        containsOrder.product_name = jsonArray.product_name;
        containsOrder.product_costs = jsonArray.product_costs;
        containsOrder.quantity = jsonArray.quantity;
        // console.log(containsOrder);
        ContainEntity.create(containsOrder);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating order.",
      });
    });
};

//GET, find order by month and current User
exports.getOrderByDate = (req, res) => {
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

  OrderEntity.findAll({
    include: {
      model: UserEntity,
      as: "u",
    },
    include: {
      model: ContainEntity,
      as: "c",
      attributes: ["contain_id", "product_name", "product_costs", "quantity"],
    },
    where: condition,
    attributes: ["order_id", "date"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving order.",
      });
    });
};
