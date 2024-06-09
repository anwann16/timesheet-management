import pkg from "@prisma/client";
import prisma from "../helpers/prismaInstance.js";

const { PrismaClientKnownRequestError } = pkg;

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: "Project successfully created!",
      payload: project,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(409).json({
        message: "Project already exists",
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();

    return res.status(200).json({
      message: "Successfully get all projects",
      payload: projects,
    });
  } catch (err) {
    throw new Error(err);
  }
};
