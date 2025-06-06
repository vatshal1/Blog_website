import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import { getAllBlogs } from "../controllers/blogController.js";
import auth from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/blogs", auth, getAllBlogs);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/dashboard", auth, getDashboard);

adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);

export default adminRouter;
