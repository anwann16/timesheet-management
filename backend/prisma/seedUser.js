import prisma from "../src/helpers/prismaInstance.js";

export const createUser = async () => {
  try {
    const defaultUser = "Andi Kurniawan";
    const userExist = await prisma.user.findFirst({
      where: {
        name: defaultUser,
      },
    });

    if (!userExist) {
      await prisma.user.create({
        data: {
          name: defaultUser,
          rate: 50000,
        },
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
