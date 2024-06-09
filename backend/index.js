import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import userRouter from "./src/routes/userRoute.js";
import { createUser } from "./prisma/seedUser.js";
import projectRouter from "./src/routes/projectRoute.js";
import activityRouter from "./src/routes/activityRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/activities", activityRouter);

const startServer = async () => {
  await createUser();
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
};

startServer();
