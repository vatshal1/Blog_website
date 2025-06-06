import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("comment", commentSchema);
