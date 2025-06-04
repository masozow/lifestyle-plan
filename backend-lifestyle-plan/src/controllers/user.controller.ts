import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { errorAndLogHandler, errorLevels } from "../utils/errorHandler.js";

const create = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.body;
    console.log('Body: ', req.body);
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });

    res.status(201).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "User created",
        shouldSaveLog: true,
         // userId: req.user?.id || 0, //removing this while testing
        userId: 0,
        genericId: user?.id?.toString(),
      })
    );
  } catch (error) {
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error creating user: " + (error as Error).message,
        userId: 0,
      })
    );
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, 
    });

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error fetching users: ` + error.message,
        // userId: req.user?.id || 0, //removing this while testing
        userId: 0,
      })
    );
  }
};

export const UserController = {
  create,
  getAll,
};
