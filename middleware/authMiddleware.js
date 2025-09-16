import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.decodedData = decode;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export default authMiddleware;
