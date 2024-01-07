import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import tryAndCatch from "../Utils";
import Joi from "joi";

interface IProduct {
  name: string;
  description: string;
  price: number;
}

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().min(5).required(),
  price: Joi.number().required(),
});
const updateInfoSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().min(5),
  price: Joi.number(),
});

const idSchema = Joi.object({
  id: Joi.number().required(),
});

export default (prisma: PrismaClient) => {
  const findProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  };

  const getAllProducts = tryAndCatch(async (req: Request, res: Response) => {
    // TODO: Implement logic to get all products from the database
    const products = await prisma.product.findMany();
    res.send({ "Get all products": products });
  });

  const createProduct = tryAndCatch(async (req: Request, res: Response) => {
    // TODO: Implement logic to create a new product in the database

    const { error, value } = productSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const product = await prisma.product.create({
      data: { ...value },
    });

    res.send({ "Created product": product });
  });

  const getProductById = tryAndCatch(async (req: Request, res: Response) => {
    // TODO: Implement logic to get a product by ID from the database
    const { error, value } = idSchema.validate(req.params, {
      abortEarly: false,
    });
    
    if (error) {
      throw new Error(error.message);
    }

    const product = await findProductById(value?.id);

    res.send({ "product: ": product });
  });

  const updateProduct = tryAndCatch(async (req: Request, res: Response) => {
    if (!req?.body || Object.keys(req.body).length === 0) {
      throw new Error('Empty body.');
    }
    

    const { error: idError, value: idValue } = idSchema.validate(req.query);
    const { error: infoError, value: infoValue } = updateInfoSchema.validate(req.body);
    
    if (idError) throw new Error(idError.message);
    if (infoError) throw new Error(infoError.message);
  
    const { name, description, price }: IProduct = req.body;
    
    const product = await findProductById(idValue.id);
  
    const updatedProduct = await prisma.product.update({
      where: { id: idValue.id },
      data: { 
        name: infoValue.name || product.name,
        description: infoValue.description || product.description,
        price: infoValue.price || product.price,
      },
    });
  
    res.send({ "Updated product": updatedProduct });
  });
  

  const deleteProductById = tryAndCatch(async (req: Request, res: Response) => {
    // TODO: Implement logic to delete a product by ID from the database
    const { error, value } = idSchema.validate(req.params, {
      abortEarly: false,
    });
    
    if (error) {
      throw new Error(error.message);
    }

    await findProductById(value?.id);
    const deletedProduct = await prisma.product.delete({where: {id: value?.id}});

    res.send({ "Deleted product: ": deletedProduct });
    
  });

  const deleteAllProducts = tryAndCatch(async (req: Request, res: Response) => {
    // TODO: Implement logic to delete all products from the database
    await prisma.product.deleteMany();
    res.send("Delete all products");
  });

  return {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProductById,
    deleteAllProducts,
  };
};
