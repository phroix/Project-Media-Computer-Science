const request = require("supertest");
const app = require("../index");

describe("Test the root path", () => {
  test("It should responsd 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
