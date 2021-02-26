const User = require("./user-models");
const db = require("../../data/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("users model", () => {
  it("can ADD a user", async () => {
    await User.add({ username: "ruben", password: "123" });
    let users = await db("users");
    expect(users).toHaveLength(1);

    await User.add({ username: "bbb", password: "meh" });
    users = await db("users");
    expect(users).toHaveLength(2);
  });
});
