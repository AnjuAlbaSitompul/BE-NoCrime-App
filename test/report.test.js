import supertest from "supertest";
import { web } from "../src/application/web.js";
import { KMeans } from "../src/utils/kmeans.js";

describe("report text", () => {
  let accessToken;
  it("should login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      email: "anjuluvmotis13@gmail.com",
      password: "12345678",
      expoToken: "ExponentPushToken[3skk1222]",
    });
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  //   it("should make a new report", async () => {
  //     const response = await supertest(web)
  //       .post("/api/reports")
  //       .send({
  //         typeId: 1,
  //         subdistrictId: 1,
  //         latitude: 3.1223,
  //         longitude: 99.3391,
  //       })
  //       .set("authorization", `Bearer ${accessToken}`);
  //     expect(response.status).toBe(201);
  //   });

  it("should update report", async () => {
    const response = await supertest(web)
      .delete("/api/admin/reports/19")
      .set("authorization", `Bearer ${accessToken}`);
    console.log(response.body);
    expect(response.status).toBe(201);
  });

  it("should get report", async () => {
    const response = await supertest(web)
      .get("/api/admin/reports")
      .query({ take: 2 })
      .set("authorization", `Bearer ${accessToken}`);

    console.log(response.body);
    expect(response.status).toBe(200);
  });

  //   it("should get data / subdistricts", async () => {
  //     const response = await supertest(web)
  //       .get("/api/users/reports/danger")
  //       .set("authorization", `Bearer ${accessToken}`);

  //     console.log(response.body.data);
  //     expect(response.status).toBe(200);
  //   });
});
