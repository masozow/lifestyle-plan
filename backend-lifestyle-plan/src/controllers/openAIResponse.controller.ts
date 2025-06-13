import { Request, Response } from "express";
import OpenAIResponse from "../models/openAIResponse.model.js";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";

const getAll = async (_req: Request, res: Response) => {
  try {
    const responses = await OpenAIResponse.findAll();
    return res.status(200).json({ success: true, data: responses });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error fetching OpenAI responses: ${(error as Error).message}`,
        userId: 0,
      })
    );
  }
};

const getByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const responses = await OpenAIResponse.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ success: true, data: responses });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error fetching OpenAI responses by userId: ${(error as Error).message}`,
        userId: Number(userId),
        genericId: userId,
      })
    );
  }
};

export const OpenAIResponseController = {
  getAll,
  getByUserId,
};
