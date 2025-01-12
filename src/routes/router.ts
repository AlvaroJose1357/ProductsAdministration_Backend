import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);

router.get("/", getProduct);

router.post(
  "/",
  body("name").isString().notEmpty().withMessage("Name Product is required"),
  body("price")
    .isNumeric()
    .withMessage("Valor Price Product not is valid")
    .notEmpty()
    .withMessage("Price Product is required")
    .custom((value) => {
      value > 0;
    })
    .withMessage("Price Product not is valid"),
  createProduct
);

router.put("/");

router.patch("/");

router.delete("/", deleteProduct);

export default router;
