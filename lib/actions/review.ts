"use server";

import mongoose from "mongoose";

import dbConnect from "@/lib/db";
import Review from "@/lib/models/review";

async function getReviewsAndRating(productId: string) {
  await dbConnect();
  // grab all the reviews for the product
  const reviews = await Review.find({ productId });

  // calculate the average rating
  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
  });

  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  return { reviews, averageRating };
}

export async function createReview(review: Review) {
  await dbConnect();
  try {
    const newReview = await Review.create(review);
    return newReview._id.toString();
  } catch (err) {
    console.error(err);
    throw new Error("Error creating review");
  }
}
