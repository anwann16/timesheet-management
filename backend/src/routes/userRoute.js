import { Router } from "express";
import { getUser, updatedUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.put("/update", updatedUser);

export default userRouter;
