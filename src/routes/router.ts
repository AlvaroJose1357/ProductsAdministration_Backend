import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);

router.get("/", getProduct);

router.post("/", createProduct);

router.put("/");

router.patch("/");

router.delete("/", deleteProduct);

export default router;
