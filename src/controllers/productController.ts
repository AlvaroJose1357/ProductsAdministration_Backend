import { Request, Response } from "express";
import Product from "../models/Product.model";

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
  try {
    res.json("CreateProduct");
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
