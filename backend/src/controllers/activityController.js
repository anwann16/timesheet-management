import prisma from "../helpers/prismaInstance.js";
import { timeDifference } from "../helpers/timeDifferent.js";

export const createActivity = async (req, res) => {
  try {
    const { title, projectId, startDate, endDate, startTime, endTime } =
      req.body;

    const validation =
      !title || !projectId || !startDate || !endDate || !startTime || !endTime;

    if (validation) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const startDateTime = new Date(`${startDate}T${startTime}:00.000Z`);
    const endDateTime = new Date(`${endDate}T${endTime}:00.000Z`);

    // Format kembali ke string tanpa detik
    const formattedStartDate = startDateTime.toISOString();
    const formattedEndDate = endDateTime.toISOString();

    const activity = await prisma.activity.create({
      data: {
        title,
        projectId,
        startDate: startDateTime,
        endDate: endDateTime,
        startTime: formattedStartDate,
        endTime: formattedEndDate,
        duration: timeDifference(formattedStartDate, formattedEndDate),
      },
    });

    res.status(201).json({
      message: "Activity successfully created!",
      payload: activity,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getActivity = async (req, res) => {
  try {
    const {
      sortBy = "createdAt",
      order = "asc",
      search = "",
      projects,
    } = req.query;

    const filters = projects ? projects.split(",") : [];

    let activities = await prisma.activity.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
        ...(filters.length > 0 && {
          projectId: {
            in: filters,
          },
        }),
      },
      orderBy: {
        [sortBy]: order,
      },
      include: {
        project: true,
      },
    });

    res.status(200).json({
      message: "Successfully get all activities",
      payload: activities,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { title, projectId, startDate, endDate, startTime, endTime } =
      req.body;
    const { id } = req.params;
    const activity = await prisma.activity.findUnique({
      where: {
        id,
      },
    });

    if (!activity) {
      res.status(404).json({
        message: "Activity not found",
      });
    }

    const startDateTime = new Date(`${startDate}T${startTime}:00.000Z`);
    const endDateTime = new Date(`${endDate}T${endTime}:00.000Z`);

    // Format kembali ke string tanpa detik
    const formattedStartDate = startDateTime.toISOString();
    const formattedEndDate = endDateTime.toISOString();

    await prisma.activity.update({
      where: {
        id,
      },
      data: {
        title: title || activity.title,
        projectId: projectId || activity.projectId,
        startDate: startDateTime || activity.startDate,
        endDate: endDateTime || activity.endDate,
        startTime: formattedStartDate || activity.startTime,
        endTime: formattedEndDate || activity.endTime,
      },
    });

    res.status(200).json({
      message: "Activity successfully updated!",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
      where: {
        id,
      },
    });

    if (!activity) {
      res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({
      message: "Get activity success",
      payload: activity,
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({
        message: "Activity not found",
      });
    }

    await prisma.activity.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Activity deleted",
    });
  } catch (err) {
    throw new Error(err);
  }
};
