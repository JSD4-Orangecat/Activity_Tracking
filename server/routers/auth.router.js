import { Router } from "express";
import {
  login,
  register,
  getUser,
  deleteUserAccount,
  editProfile,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.get("/:id", getUser);
authRouter.delete("/:id", deleteUserAccount);
authRouter.put("/:id", editProfile);
authRouter.post("/login", login);

export default authRouter;
