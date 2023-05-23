import { Router } from "express";
import {
  login,
  register,
  getUser,
  deleteUserAccount,
  editProfile,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.js";
import { protect } from "../middlewares/protect.js";

const authRouter = Router();

authRouter.post("/register", upload.single("picture"), register);

authRouter.post("/login", login);
authRouter.get("/profile", protect, getUser);
authRouter.delete("/profile", protect, deleteUserAccount);
authRouter.put("/profile", protect, upload.single("picture"), editProfile);

export default authRouter;
