import { Router } from "express";
import { protect } from '../middlewares/protect.js';
import { postActivities, getActivity } from "../controllers/activities.controller.js";

const activitiesRouter = Router();

activitiesRouter.post("/createActivityCard", postActivities);
activitiesRouter.get("/", protect, getActivity);



export default activitiesRouter;