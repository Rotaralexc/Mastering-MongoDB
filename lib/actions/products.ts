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
