import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: String,
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("blog", blogSchema);
