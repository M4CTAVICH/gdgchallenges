import jwt from "jsonwebtoken";
import User from "../models/user";

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = User.findbyid(decoded.id);
      if (!user) {
        return res.status(401).json({ msg: "unauthorized" });
      }
      req.user = user;
      console.log(decoded);
      return next();
    }
    return res.status(200).json({ msg: "Not authorized" });
  } catch (error) {
    res.status(401).json({ msg: "Not authorized to access this route" });
  }
};
