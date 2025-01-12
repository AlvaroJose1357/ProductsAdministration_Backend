import { Request, Response } from "express";
import Product from "../models/Product.model";
import { validationResult } from "express-validator";

export const getProducts = async (req: Request, res: Response) => {
  try {
    res.json("getProducts");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  try {
    res.json("getProduct");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  // validacion en el controlador
  // await check("name").isString().notEmpty().withMessage("Name Product is required").run(req);
  // await check("price")
  //   .isNumeric()
  //   .withMessage("Valor Price Product not is valid")
  //   .notEmpty()
  //   .withMessage("Price Product is required")
  //   .custom((value) => {
  //     value > 0;
  //   })
  //   .withMessage("Price Product not is valid")
  //   .run(req);
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    res.json("updateProduct");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    res.json("deleteProduct");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
