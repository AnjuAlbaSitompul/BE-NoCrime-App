import supertest from "supertest";
import { web } from "../src/application/web";

describe("do type test", () => {
  let accessToken;
  it("should login as admin", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      email: "anjuluvmotis13@gmail.com",
      password: "12345678",
    });

    accessToken = response.body.data.accessToken;
    expect(response.status).toBe(200);
  });

  it("should get types", async () => {
    console.log(accessToken, "this is AccessToken");
    const response = await supertest(web)
      .get("/api/types")
      .set("authorization", `Bearer ${accessToken}`);

    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
