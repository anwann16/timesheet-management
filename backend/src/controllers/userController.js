import prisma from "../helpers/prismaInstance.js";

export const getUser = async (req, res) => {
  try {
    const defaultUser = "Andi Kurniawan";
    const userExist = await prisma.user.findFirst({
      where: {
        name: defaultUser,
      },
    });

    if (!userExist) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      message: "Successfully get user",
      payload: userExist,
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const updatedUser = async (req, res) => {
  try {
    const { rate } = req.body;
    const defaultUser = "Andi Kurniawan";
    const userExist = await prisma.user.findFirst({
      where: {
        name: defaultUser,
      },
    });

    await prisma.user.update({
      where: {
        id: userExist.id,
      },
      data: {
        name: defaultUser,
        rate,
      },
    });

    res.status(200).json({
      message: "User Successfully Updated!",
    });
  } catch (err) {
    throw new Error(err);
  }
};
