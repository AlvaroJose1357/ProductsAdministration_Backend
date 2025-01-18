import request from "supertest";
import app from "../server";
// describe("Mi primer Test", () => {
//   it("debe revisar si 2 + 2 es 4", () => {
//     expect(2 + 2).toBe(4);
//   });
//   it("debe revisar si 2 + 2 no sea 5", () => {
//     expect(2 + 2).not.toBe(5);
//   });
// });

describe("GET /api", () => {
  it("should send back a JSON response", async () => {
    const res = await request(app).get("/api");
    //? las que deben de ser
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    // expect(res.body).toEqual({ message: "API con express y typescript" });
    expect(res.body.message).toBe("API con express y typescript");
    //? las que no deben de ser
    expect(res.status).not.toBe(404);
    expect(res.body.message).not.toBe("API con express y typescript 2");
  });
});
