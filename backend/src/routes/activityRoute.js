import { Router } from "express";
import {
  createActivity,
  deleteActivity,
  getActivity,
  getActivityById,
  updateActivity,
} from "../controllers/activityController.js";

const activityRouter = Router();

activityRouter.post("/create", createActivity);
activityRouter.get("/", getActivity);
activityRouter.get("/:id", getActivityById);
activityRouter.put("/:id", updateActivity);
activityRouter.delete("/:id", deleteActivity);

export default activityRouter;
