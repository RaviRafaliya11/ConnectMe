import getPrismaInstance from "../utils/PrismaClient.js";
import { generateToken04 } from "../utils/TokenGenerator.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email is required.", status: false });
    }

    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found.", status: false });
    } else {
      return res.json({ msg: "User Found.", status: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

export const createNewUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture, password } = req.body;
    if (!email || !name || !profilePicture || !password) {
      return res.json("Email,Name,Password and Image are required.");
    }
    const prisma = getPrismaInstance();
    await prisma.user.create({
      data: {
        email,
        name,
        about,
        profilePicture,
        password,
      },
    });
    return res.json({ msg: "Success", status: true });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
        about: true,
      },
    });

    const usersGroupedByInitialLetter = {};
    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter] = [];
      }
      usersGroupedByInitialLetter[initialLetter].push(user);
    });
    return res.status(200).send({ users: usersGroupedByInitialLetter });
  } catch (err) {
    next(err);
  }
};

export const generateToken = (req, res, next) => {
  try {
    const appId = parseInt(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_ID;
    const userId = req.params.userId;
    const effectiveTime = 3600;
    const payload = "";
    if (appId && serverSecret && userId) {
      const token = generateToken04(
        appId,
        userId,
        serverSecret,
        effectiveTime,
        payload
      );
      res.status(200).json({ token });
    }
    return res.status(400).send("invalid");
  } catch (err) {
    next(err);
  }
};

export const updateUserPremiumStatus = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const prisma = getPrismaInstance();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isPremiumUser: true,
      },
    });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
