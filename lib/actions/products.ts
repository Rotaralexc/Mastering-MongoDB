"use server";

import Product from "@/lib/models/product";
// Import the database connection
import dbConnect from "@/lib/db";

export async function createProduct(product: Product) {
  try {
    await dbConnect();
    const newProduct = await Product.create(product);
    return newProduct._id.toString();
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }
}

export async function getProductById(_id: string) {
  await dbConnect();
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateProduct(productId: string, data: Partial<Product>) {
  // Make sure we connect to the database
  await dbConnect();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });

    return updatedProduct._id.toString();
  } catch (error) {
    console.error(error);
    return null;
  }
}
