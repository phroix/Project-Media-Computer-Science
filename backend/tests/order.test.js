const request = require("supertest");
const app = require("../index");
const db = require("../entity/index.entity");
const ContainEntity = db.conatins;

describe("Test the order routes", () => {
  describe("post order route Terminal", () => {
    test("It should create a new order", async () => {
      const responseOrder = await request(app)
        .post("/orders/1")
        .send([
          {
            product_id: 1,
            quantity: 2,
          },
          {
            product_id: 2,
            quantity: 3,
          },
        ]);
      expect(responseOrder.statusCode).toBe(200);

      const currentOrderId = responseOrder.body.order_id;

      const containsOrder = {
        order_id: currentOrderId,
        product_id: responseOrder.request._data.product_id,
        quantity: responseOrder.request._data.quantity,
      };

      responseOrder.request._data.forEach((element) => {
        containsOrder.product_id = element.product_id;
        containsOrder.quantity = element.quantity;
        ContainEntity.create(containsOrder);
      });

      expect(responseOrder.body).toHaveProperty("order_id");
      expect(responseOrder.body).toHaveProperty("date");
      expect(responseOrder.body).toHaveProperty("user_id");
    });
  });

  describe("get order route WebApp", () => {
    test("It should get all orders by date", async () => {
      const response = await request(app).get("/orders/1?date=01/01/2023");
      expect(response.statusCode).toBe(200);
    });
  });
});
