import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("test login user", () => {
  let accessToken;
  it("should login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      email: "anjuluvmotis13@gmail.com",
      password: "12345678",
    });
    console.log(response.body);
    accessToken = response.body.data.accessToken;
    expect(response.status).toBe(200);
  });

  it("should logOut", async () => {
    console.log(accessToken, "this is AccessToken");
    const response = await supertest(web)
      .delete("/api/users/logout")
      .set("authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });
});
