import fs from "fs";

import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import imagekit from "../config/imageKit.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, category, description, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    //-> Check if all fields are present
    if (
      !title ||
      !description ||
      !category ||
      !imageFile ||
      isPublished === undefined
    ) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //-> upload Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //-> optimization through imageKit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    //-> Create blog
    await Blog.create({
      title: title.trim(),
      subTitle: subTitle?.trim(),
      description: description.trim(),
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res.json({ success: true, message: "Blog added Successfully" });
  } catch (error) {
    res.json({ success: false, message: "Failed to add blog" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to fetch blog" });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    //-> check if blog exists before deleting
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    //-> Delete the blog
    await Blog.findByIdAndDelete(id);

    //-> Delete all comments associated with deleted 'blog'
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    //-> find blog and get current status
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    //-> Toggle and save
    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to update blog status" });
  }
};

//_ comments

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    await Comment.create({ blog, name, content, isApproved: false });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to add comment" });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//_ content through gemini
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      `Generate a blog content for the given topic. Topic title is ${prompt}`
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
