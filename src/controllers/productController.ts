import { Request, Response } from "express";

export const getProducts = (req: Request, res: Response) => {
  res.json("getProducts");
};
export const getProduct = (req: Request, res: Response) => {
  res.json("getProduct");
};

export const createProduct = (req: Request, res: Response) => {
  res.json("createProduct");
};

export const updateProduct = (req: Request, res: Response) => {
  res.json("updateProduct");
};

export const deleteProduct = (req: Request, res: Response) => {
  res.json("deleteProduct");
};
