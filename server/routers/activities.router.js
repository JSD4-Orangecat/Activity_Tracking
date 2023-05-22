import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { upload } from "../middlewares/multer.js";
import {
  postActivities,
  getActivity,
  deleteActivity,
} from "../controllers/activities.controller.js";

const activitiesRouter = Router();

activitiesRouter.post(
  "/createActivityCard",
  protect,
  upload.single("img"),
  postActivities
);
activitiesRouter.get("/", protect, getActivity);
activitiesRouter.delete("/:id", protect, deleteActivity);

export default activitiesRouter;
