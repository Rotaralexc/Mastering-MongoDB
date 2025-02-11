import { Key } from "react";

import AddReview from "@/components/product/AddReview";
import Product from "@/components/product/Product";
import AddProduct from "@/components/product/AddProduct";
import DeleteProduct from "@/components/delete/DeleteProduct";
import { getProductById } from "@/lib/actions/products";
import Review from "@/lib/models/review";

export const revalidate = 1;

export default async function Page({ params }: { params: { path: string[] } }) {
  const method = params.path[0];
  const id = params.path[1];

  if (method === "new") {
    return <AddProduct />;
  }
  if (method === "edit") {
    return <AddProduct edit id={id} />;
  }
  if (method === "delete") {
    return <DeleteProduct id={id} />;
  }

  const product = await getProductById(id);
  const { reviews, averageRating } = await getReviewsAndRating(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="pt-20 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
      <Product product={product} rating={averageRating} />
      <div className="grid gap-4">
        {reviews.map((review: Review, index: Key | null | undefined) => (
          <Review key={index} review={review} />
        ))}
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
