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
authRouter.get("/user/:id", getUser);
authRouter.delete("/delete/:id", deleteUserAccount);
authRouter.put("/edit/:id", editProfile);
authRouter.post("/login", login);

export default authRouter;
