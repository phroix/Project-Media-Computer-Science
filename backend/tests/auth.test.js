const request = require("supertest");
const app = require("../index");

describe("Test the login routes", () => {
  describe("post login route WebApp", () => {
    test("It should log in a user with a valid username and password", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "Phil.Roth",
        password: "firstLogin",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("user_id");
      expect(response.body).toHaveProperty("credits");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("is_admin");
      expect(response.body).toHaveProperty("rfid");
    });

    test("It should not log in a user with an invalid username and password", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "invalidUsername",
        password: "invalidPassword",
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid Username or Password.");
    });
  });

  describe("post login route Terminal", () => {
    test("It should log in a user with a valid rfid", async () => {
      const response = await request(app).post("/auth/loginRFID").send({
        rfid: "12",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("user_id");
      expect(response.body).toHaveProperty("credits");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("is_admin");
      expect(response.body).toHaveProperty("rfid");
    });

    test("It should not log in a user with an invalid rfid", async () => {
      const response = await request(app).post("/auth/loginRFID").send({
        rfid: "invalidRfid",
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid RFID.");
    });
  });
});
