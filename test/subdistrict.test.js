import supertest from "supertest";
import { web } from "../src/application/web.js";

describe("subdistrict", () => {
  let accessToken;
  it("should login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      email: "anjuluvmotis13@gmail.com",
      password: "12345678",
    });

    accessToken = response.body.data.accessToken;
    expect(response.status).toBe(200);
  });

  //   it("should make a new subdistrict", async () => {
  //     const response = await supertest(web)
  //       .post("/api/subdistricts")
  //       .send({
  //         name: "TELUK NIBUNG",
  //         latitude: 3.00809,
  //         longitude: 99.80691,
  //         radius: 3000,
  //       })
  //       .set("authorization", `Bearer ${accessToken}`);
  //     expect(response.status).toBe(201);
  //   });

  it("should get all subdistricts", async () => {
    const response = await supertest(web)
      .get("/api/subdistricts")
      .set("authorization", `Bearer ${accessToken}`);

    console.log(response.body.data);
    expect(response.status).toBe(200);
  });
});
