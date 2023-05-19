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
authRouter.get("/profile/:id", getUser);
authRouter.delete("/profile/:id", deleteUserAccount);
authRouter.put("/profile/:id", editProfile);
authRouter.post("/login", login);

export default authRouter;
