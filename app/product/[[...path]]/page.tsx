import { Key } from "react";

import AddReview from "@/components/product/AddReview";
import Product from "@/components/product/Product";
import AddProduct from "@/components/product/AddProduct";
import DeleteProduct from "@/components/delete/DeleteProduct";
import { getProductById } from "@/lib/actions/products";
import Review from "@/lib/models/review";
import product from "@/lib/models/product";

export const revalidate = 1;

export default async function Page({ params }: { params: { path: string[] } }) {
  const method = params.path[0];
  const id = params.path[1];

  if (method === "new") {
    return <AddProduct />;
  }

  const product = await getProductById(id);
  const { reviews, averageRating } = await getReviewsAndRating(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  if (method === "edit") {
    return <AddProduct edit id={id} product={product} />;
  }
  if (method === "delete") {
    return <DeleteProduct id={id} />;
  }

  return (
    <div className="pt-20 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
      <Product product={product} rating={averageRating} />
      <div className="grid gap-4">
        {reviews.map((review: Review, index: Key | null | undefined) => (
          <Review key={index} review={review} />
        ))}
      </div>
      <div className="md:col-span-2">
        <AddReview id={id} />
      </div>
    </div>
  );
}
function getReviewsAndRating(
  id: string
):
  | { reviews: any; averageRating: any }
  | PromiseLike<{ reviews: any; averageRating: any }> {
  throw new Error("Function not implemented.");
}
