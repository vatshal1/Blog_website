import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

//-> connect to MongoDB
connectDB();

//-> Middlewares
app.use(cors());
app.use(express.json());

//-> route handling
app.use("/", (req, res, next) => {
  console.log(`url -> ${req.url} and method -> ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

//-> server running
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
