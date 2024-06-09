import { Router } from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";

const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.post("/", createProject);
export default projectRouter;
