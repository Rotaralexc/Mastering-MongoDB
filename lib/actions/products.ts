"use server";

import { pipeline } from "stream";

import { unstable_cache as cache, revalidateTag } from "next/cache";

import Product from "@/lib/models/product";
// Import the database connection
import dbConnect from "@/lib/db";
import page from "@/app/page";

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

async function _getProductById(_id: string) {
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

export const getProductById = cache(_getProductById, ["getProductById"], {
  tags: ["Product"],
  revalidate: 60, // Re-fetch the data every 60 seconds
});

export async function updateProduct(productId: string, data: Partial<Product>) {
  // Make sure we connect to the database
  await dbConnect();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });

    // Mark the data as stale, and re-fetch it from the database
    revalidateTag("Product");
    return updatedProduct._id.toString();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteProduct(productId: string): Promise<boolean> {
  // make sure we connect to the database
  await dbConnect();
  try {
    // delete the product by ID
    const result = await Product.deleteOne({ _id: productId });

    // Mark the data as stale, and re-fetch it from the database
    revalidateTag("Product");
    return result.deletedCount === 1;
  } catch (error) {
    console.error("Error deleting product", error);
    return false;
  }

  export async function getProducts(
  page: number,
  search: string,
  minPrice: number,
  category?: string // Ensure `category` is optional
) {
  await dbConnect();

  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const matchFilter: any = {
      name: {
        $regex: search,
        $options: "i",
      },
      price: {
        $gte: minPrice,
      },
    };

    // Add category conditionally
    if (category) {
      matchFilter.category = category;
    }

    const pipeline = [
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "reviews",
        },
      },
      {
        $project: {
          name: 1,
          image: { $first: "$images" },
          averageRating: {
            $avg: "$reviews.rating",
          },
        },
      },
      {
        $match: matchFilter, // Use pre-built match filter
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ];

    const products = await Product.aggregate(pipeline);
    return products;
  } catch (error) {
    console.log(error);
  }
}

  