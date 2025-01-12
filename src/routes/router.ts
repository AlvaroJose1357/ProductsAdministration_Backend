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

router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("ID Product not is valid"),
  handleInputError,
  getProductByID
);

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

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID Product not is valid"),
  handleInputError,
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID Product not is valid"),
  handleInputError,
  deleteProduct
);

export default router;
