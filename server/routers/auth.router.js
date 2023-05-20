import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import {
  login,
  register,
  getUser,
  deleteUserAccount,
  editProfile,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
// authRouter.get("/profile/:id", protect, getUser);
authRouter.get("/profile", protect, getUser);
authRouter.delete("/profile", protect, deleteUserAccount);
authRouter.put("/profile", protect, editProfile);
authRouter.post("/login", login);

export default authRouter;
