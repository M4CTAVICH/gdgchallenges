import { Router } from "express";
import {
  getusers,
  createusers,
  getusersbyid,
  updateuser,
  deleteuser,
} from "../controller/users.js";

const userRoutes = Router();

userRoutes.get("/", getusers);
userRoutes.post("/", createusers);
userRoutes.get("/:id", getusersbyid);
userRoutes.put("/:id", updateuser);
userRoutes.delete("/:id", deleteuser);

export default userRoutes;
