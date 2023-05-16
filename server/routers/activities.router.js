import { Router } from "express";
import { protect } from '../middlewares/protect.js';
import { postActivities, getActivity, deleteActivity } from "../controllers/activities.controller.js";

const activitiesRouter = Router();

activitiesRouter.post("/createActivityCard", postActivities);
activitiesRouter.get("/", protect, getActivity);
activitiesRouter.delete("/deleteActivity", deleteActivity);



export default activitiesRouter;