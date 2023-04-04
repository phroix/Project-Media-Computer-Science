const request = require("supertest");
const app = require("../index");

describe("Test the user route", () => {
  describe("post user route createUser", () => {
    test("It should create a new user", async () => {
      const response = await request(app).post("/users").send({
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.de",
        is_admin: false,
      });
      //No token provided
      //   expect(response.statusCode).toBe(403);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("user_id");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("password");
      expect(response.body).toHaveProperty("firstname");
      expect(response.body).toHaveProperty("lastname");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("credits");
      expect(response.body).toHaveProperty("is_admin");
      expect(response.body).toHaveProperty("firstLogin");

      expect(response.body).toEqual({
        user_id: response.body.user_id,
        username: "Jane.Doe",
        password: response.body.password,
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.de",
        credits: 0,
        is_admin: false,
        firstLogin: false,
      });
    });
  });

  describe("get user route getUserByUsername", () => {
    test("It should get a user by id", async () => {
      const response = await request(app).get("/users?username=B.B");
      //No token provided
      //   expect(response.statusCode).toBe(403);

      expect(response.statusCode).toBe(200);

      expect(response.body).toEqual([
        {
          user_id: 2,
          username: "B.B",
          password:
            "$2a$08$lKWdFbpxLiQmfNpTlErbt.tFsG2D9Kty7nX2lz4d3DScJi76h5gOa",
          rfid: null,
          credits: 0,
          firstname: "B",
          lastname: "B",
          email: "B.B@mail.de",
          is_admin: false,
          firstLogin: false,
        },
      ]);
    });
  });

  describe("get user route getUsersList", () => {
    test("It should get all users expect for logged in", async () => {
      const response = await request(app).get("/users/list");
      //No token provided
      //   expect(response.statusCode).toBe(403);

      expect(response.statusCode).toBe(200);

      expect(response.body).toEqual([
        {
          user_id: 2,
          username: "B.B",
          password:
            "$2a$08$lKWdFbpxLiQmfNpTlErbt.tFsG2D9Kty7nX2lz4d3DScJi76h5gOa",
          rfid: null,
          credits: 0,
          firstname: "B",
          lastname: "B",
          email: "B.B@mail.de",
          is_admin: false,
          firstLogin: false,
        },
        {
          user_id: 3,
          username: "Arne.Hob",
          password:
            "$2a$08$1qXy.YKOzNb1JKQI8crJMOZ6iJrdh.jifIWx04TXjafcvtxUb7rf2",
          rfid: null,
          credits: 11,
          firstname: "Arne",
          lastname: "Hob",
          email: "A.H@mail.de",
          is_admin: false,
          firstLogin: false,
        },
      ]);
    });
  });

  describe("get user route getUserById", () => {
    test("It should get user credit for logged in", async () => {
      const response = await request(app).get("/users/1");
      //No token provided
      //   expect(response.statusCode).toBe(403);

      expect(response.statusCode).toBe(200);

      expect(response.body).toEqual({
        user_id: 2,
        username: "B.B",
        password:
          "$2a$08$lKWdFbpxLiQmfNpTlErbt.tFsG2D9Kty7nX2lz4d3DScJi76h5gOa",
        rfid: null,
        credits: 50,
        firstname: "B",
        lastname: "B",
        email: "B.B@mail.de",
        is_admin: false,
        firstLogin: false,
      });
    });
  });

  describe("update user route updateUser", () => {
    test("It should update a user by id", async () => {
      const response = await request(app).put("/users/3").send({
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@example.com",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "User was updated successfully.",
      });
    });
  });

  describe("delete user route deleteUser", () => {
    test("It should delete a user by id", async () => {
      const response = await request(app).delete("/users/18");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "User was deleted successfully!",
      });
    });
  });
});
