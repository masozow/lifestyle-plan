import { Request, Response } from "express";
import { UserPrompt } from "../models/index.js";
import { errorAndLogHandler, errorLevels } from "../utils/errorHandler.js";

const create = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "Unauthorized: Missing user ID from token",
        })
      );
    }

    const prompt = await UserPrompt.create({ ...req.body, userId });

    res.status(201).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "User prompt created",
        shouldSaveLog: true,
        userId,
        genericId: prompt?.id?.toString(),
      })
    );
  } catch (error) {
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error creating user prompt: " + (error as Error).message,
        userId: req.user?.id || 0,
      })
    );
  }
};

const getByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const prompts = await UserPrompt.findAll({ where: { userId } });
    return res.status(200).json({ success: true, data: prompts });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error fetching prompts: " + error.message,
        userId: req.user?.id || 0,
      })
    );
  }
};

export const UserPromptController = {
  create,
  getByUser,
};
