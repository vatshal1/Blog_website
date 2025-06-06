import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: String,
    images: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("blog", blogSchema);
