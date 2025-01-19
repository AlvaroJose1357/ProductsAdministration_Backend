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

describe("GET /api/products/:id", () => {
  it("should return a product by id", async () => {
    const productID = 1; // existe
    const response = await request(app).get(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(200);
    // expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    // los que no deben de cumplir
    expect(response.status).not.toBe(500);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
  it("should return a 404 response for a non-existent product", async () => {
    const productID = 100; // no existe
    const response = await request(app).get(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    // los que no deben de cumplir
    expect(response.status).not.toBe(500);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
  it("should check a valid id in the URL", async () => {
    const productID = "not-valid-url"; // no es un id valido
    const response = await request(app).get(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID Product not is valid");
    // los que no deben de cumplir
    expect(response.status).not.toBe(500);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("PUT /api/products/:id", () => {
  it("should check a valid id in the URL", async () => {
    const productID = "not-valid-url"; // no es un id valido
    const response = await request(app).put(`/api/products/${productID}`).send({
      name: "Monitor Curvo 2 - testing",
      availability: true,
      price: 500,
    }); // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID Product not is valid");
    // los que no deben de cumplir
    expect(response.status).not.toBe(500);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("error");
  });
  it("should display validations errors message when updating a product", async () => {
    const productID = 1;
    const response = await request(app)
      .put(`/api/products/${productID}`)
      .send({});
    // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy(); // verifica si en un contexto booleano es verdadero, no importa lo que contenga
    expect(response.body.errors).toHaveLength(6);
    // los que no deben de cumplir
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should validate that the price is greater than 0", async () => {
    const productID = 1;
    const response = await request(app).put(`/api/products/${productID}`).send({
      name: "Monitor Curvo - testing",
      availability: true,
      price: -500,
    });
    // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy(); // verifica si en un contexto booleano es verdadero, no importa lo que contenga
    expect(response.body.errors).toHaveLength(1);
    // los que no deben de cumplir
    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should return a 404 response for a non-existent product", async () => {
    const productID = 4565654;
    const response = await request(app).put(`/api/products/${productID}`).send({
      name: "Monitor Curvo - testing",
      availability: true,
      price: 500,
    });
    // los que deben de cumplir
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Product not found");

    // los que no deben de cumplir
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should update an existing product with valid data", async () => {
    const productID = 1;
    const response = await request(app).put(`/api/products/${productID}`).send({
      name: "Monitor Curvo - testing",
      availability: true,
      price: 500,
    });
    // los que deben de cumplir
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    // los que no deben de cumplir
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  it("should return a 404 response for a non-existent product", async () => {
    const productID = 4565654;
    const response = await request(app).patch(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Product not found");

    // los que no deben de cumplir
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should update the product availability", async () => {
    const productID = 1;
    const response = await request(app).patch(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.availability).toBe(false);

    // los que no deben de cumplir
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("DELETE /api/products/:id", () => {
  it("should check a valid id in the URL", async () => {
    const productID = "not-valid-url"; // no es un id valido
    const response = await request(app).delete(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID Product not is valid");
    // los que no deben de cumplir
    expect(response.status).not.toBe(500);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("error");
  });
  it("should return a 404 response for a non-existent product", async () => {
    const productID = 4565654;
    const response = await request(app).delete(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Product not found");

    // los que no deben de cumplir
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("should delete an existing product", async () => {
    const productID = 1;
    const response = await request(app).delete(`/api/products/${productID}`);
    // los que deben de cumplir
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    // los que no deben de cumplir
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});
