import { Router } from "express";
import { postActivities, getActivity } from "../controllers/activities.controller.js";

const activitiesRouter = Router();

activitiesRouter.post("/createActivityCard", postActivities);
activitiesRouter.get("/", getActivity);



export default activitiesRouter;