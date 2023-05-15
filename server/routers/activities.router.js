import { Router } from "express";
import { postActivities } from "../controllers/activities.controller.js";

const activitiesRouter = Router();

activitiesRouter.post("/", postActivities);



export default activitiesRouter;