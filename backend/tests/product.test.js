const request = require("supertest");
const app = require("../index");

describe("Test the product route", () => {
  describe("post product route createProduct", () => {
    test("It should create a new product", async () => {
      const response = await request(app).post("/products").send({
        name: "Wasser",
        costs: 1.5,
      });
      //No token provided
      //   expect(response.statusCode).toBe(403);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("product_id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("costs");

      expect(response.body).toEqual({
        product_id: response.body.product_id,
        name: "Wasser",
        costs: 1.5,
      });
    });
  });

  describe("get product route getProductByName", () => {
    test("It should get a product by id", async () => {
      const response = await request(app).get("/products?name=Fa");
      //No token provided
      //   expect(response.statusCode).toBe(403);

      expect(response.statusCode).toBe(200);

      expect(response.body).toEqual([
        {
          product_id: 1,
          name: "Cola",
          costs: 2,
        },
      ]);
    });
  });

  describe("get product route getProductsList", () => {
    test("It should get all products", async () => {
      const response = await request(app).get("products/list");
      //No token provided
      //   expect(response.statusCode).toBe(403);

      expect(response.statusCode).toBe(200);

      expect(response.body).toEqual([
        {
          product_id: 1,
          name: "Cola",
          costs: 2,
        },
        {
          product_id: 2,
          name: "Kaffee",
          costs: 1.5,
        },
        {
          product_id: 3,
          name: "Eis",
          costs: 1.75,
        },
        {
          product_id: 4,
          name: "Pepsi",
          costs: 2,
        },
      ]);
    });
  });

  describe("update product route updateProduct", () => {
    test("It should update a product by id", async () => {
      const response = await request(app).put("/products/4").send({
        name: "Fanta",
        costs: 2,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Product was updated successfully.",
      });
    });
  });

  describe("delete product route deleteProduct", () => {
    test("It should delete a product by id", async () => {
      const response = await request(app).delete("/products/4");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Product was deleted successfully!",
      });
    });
  });
});
