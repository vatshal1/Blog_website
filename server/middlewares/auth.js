import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    //-> verify token
    jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid or expired Token" });
  }
};

export default auth;
