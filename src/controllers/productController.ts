import { Request, Response } from "express";
import Product from "../models/Product.model";
import { getAttributes } from "sequelize-typescript";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll(
      // si los deseo ordenar de alguna manera en particular
      {
        order: [["price", "DESC"]], // ordenar por precio de manera descendente
        // attributes: { exclude: ["createdAt", "updatedAt"] }, // para excluir los campos de createdAt y updatedAt
        // limit: 10, // si deseo limitar la cantidad de productos
        // si lo dejo vacio me traera todos los productos en orden
      }
    );
    res.json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  // validacion en el controlador, se utiliza el check debido a que es funcion async
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
  // pasando la validacion al middleware
  // let errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ errors: errors.array() });
  //   return;
  // }
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    // actualizo el producto
    (await product.update(req.body)).save();
    // await product.save();
    res.status(200).json({ data: product });
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
