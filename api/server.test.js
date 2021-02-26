const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

it("correct env", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

//* this is to truncate (clear) the database each test
beforeEach(async () => {
  await db("users").truncate();
});

//* this will destroy the db after the test
afterAll(async () => {
  await db.destroy();
});

describe("server", () => {
  describe("GET Jokes", () => {
    it("responds with 200 status", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.status).toEqual(200);
    });
  });
  it("server get request returns json", () => {
    return request(server).get("/").expect("Content-Type", /json/);
  });
});
