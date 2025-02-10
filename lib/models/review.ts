//
import { Document, model, models, Schema } from "mongoose";

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

interface Review {
  author: {
    name: string;
    email: string;
  };
  rating: number;
  content: string;
  productId: string | Schema.Types.ObjectId;
}

const ReviewSchema = new Schema<Review>({
  author: { type: AuthorSchema, required: true },
  rating: { type: Number, required: true },
  content: { type: String, required: true },
  // connect to Product
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const Review = models?.Review || model<Review>("Review", ReviewSchema);

export default Review;
