import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductByID,
  getProducts,
  updateAvailability,
  updateProduct,
} from "../controllers/productController";
import { handleInputError } from "../middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: ID of the product
 *          example: 1
 *        name:
 *          type: string
 *          description: Name of the product
 *          example: Product 1
 *        price:
 *          type: integer
 *          description: Price of the product
 *          example: 100
 *        availability:
 *          type: boolean
 *          description: Availability of the product
 *          example: true
 */

/**
 * @swagger
 * /products:
 *    get:
 *      summary: Get a list of all products
 *      tags:
 *        - Products
 *      description: Retrieve a list of all products
 *      responses:
 *        200:
 *          description: Success getting all products
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags:
 *        - Products
 *      description: Retrieve a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Success getting product by ID
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        404:
 *          description: Product not found
 *        400:
 *          description: Bad request - ID Product not is valid
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("ID Product not is valid"),
  handleInputError,
  getProductByID
);

/**
 * @swagger
 * /products:
 *    post:
 *      summary: Create a new product
 *      tags:
 *        - Products
 *      description: Create a new product
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Name of the product
 *                  example: "Monitor Curvo"
 *                price:
 *                  type: integer
 *                  description: Price of the product
 *                  example: 500
 *      responses:
 *        201:
 *          description: Product created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - Invalid input data

 */
router.post(
  // se utiliza el body debido a que en este no se esta usando funcion async
  "/",
  body("name").isString().notEmpty().withMessage("Name Product is required"),
  body("price")
    .isNumeric()
    .withMessage("Valor Price Product not is valid")
    .notEmpty()
    .withMessage("Price Product is required")
    .custom((value) => value > 0)
    .withMessage("Price Product not is valid"),
  handleInputError,
  createProduct
);

/**
 * @swagger
 * /products/{id}:
 *    put:
 *      summary: Update a product by ID
 *      tags:
 *        - Products
 *      description: Update a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Name of the product
 *                  example: "Monitor Curvo"
 *                price:
 *                  type: integer
 *                  description: Price of the product
 *                  example: 500
 *                availability:
 *                  type: boolean
 *                  description: Availability of the product
 *                  example: true
 *      responses:
 *        200:
 *          description: Product updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        404:
 *          description: Product not found
 *        400:
 *          description: Bad request - Invalid ID or input data
 */
router.put(
  "/:id",
  param("id").isInt().withMessage("ID Product not is valid"),
  body("name").isString().notEmpty().withMessage("Name Product is required"),
  body("price")
    .isNumeric()
    .withMessage("Valor Price Product not is valid")
    .notEmpty()
    .withMessage("Price Product is required")
    .custom((value) => value > 0)
    .withMessage("Price Product not is valid"),
  body("availability")
    .isBoolean()
    .withMessage("Availability Product not is valid"),
  handleInputError,
  updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *    patch:
 *      summary: Update availability of a product by ID
 *      tags:
 *        - Products
 *      description: Update availability of a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Availability updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        404:
 *          description: Product not found
 *        400:
 *          description: Bad request - Invalid ID or input data
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID Product not is valid"),
  handleInputError,
  updateAvailability
);

/**
 * @swagger
 * /products/{id}:
 *    delete:
 *      summary: Delete a product by ID
 *      tags:
 *        - Products
 *      description: Delete a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Product deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                value: Product deleted
 *        404:
 *          description: Product not found
 *        400:
 *          description: Bad request - Invalid ID Product
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID Product not is valid"),
  handleInputError,
  deleteProduct
);

export default router;
