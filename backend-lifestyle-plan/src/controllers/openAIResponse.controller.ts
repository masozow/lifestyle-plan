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
  console.log("~ log from OpenAIResponseController ~ line 19 userId:", userId);
  try {
    const response = await OpenAIResponse.findOne({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    console.log("~ log from OpenAIResponseController ~ line 27 response:", response);
    return res.status(200).json({ success: true, data: response });
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
