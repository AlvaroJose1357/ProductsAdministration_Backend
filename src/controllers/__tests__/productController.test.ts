import request from "supertest";
import app from "../../server";

describe("POST /api/products", () => {
  it("should display validations errors", async () => {
    const response = await request(app).post("/api/products").send({});
    // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(5);
    //los que no deben de cumplir
    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });
  it("should validate that the price is greater than 0", async () => {
    const response = await request(app).post("/api/products").send({
      name: "Monitor - testing",
      price: 0,
    });
    // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    //los que no deben de cumplir
    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });
  it("should validate that the price is a number and greater than 0", async () => {
    const response = await request(app).post("/api/products").send({
      name: "Monitor - testing",
      price: "Holaa",
    });
    // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
    //los que no deben de cumplir
    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });
  it("should create a new product", async () => {
    const response = await request(app).post("/api/products").send({
      name: "Mouse - testing",
      price: 100,
    });
    // los que deben de cumplir
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    // los que no deben de cumplir
    expect(response.status).not.toBe(500);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  it("should check if api/products url exists", async () => {
    const response = await request(app).get("/api/products");
    // los que deben de cumplir
    expect(response.status).toBe(200);
    // los que no deben de cumplir
    expect(response.status).not.toBe(404);
  });
  it("GET a JSON response with products", async () => {
    const response = await request(app).get("/api/products");
    // los que deben de cumplir
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    // los que no deben de cumplir
    expect(response.status).not.toBe(500);
    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(201);
    expect(response.body).not.toHaveProperty("errors");
  });
});

// describe("Product Controller", () => {
//   it("should return a list of products", async () => {
//     const response = await request(app).get("/products");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([
//       { id: 1, name: "Product 1" },
//       { id: 2, name: "Product 2" },
//     ]);
//   });
// });
