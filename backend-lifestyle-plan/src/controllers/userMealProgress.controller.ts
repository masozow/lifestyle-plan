import { Request, Response } from "express";
import { UserMealProgress } from "../models/index.js";
import { errorAndLogHandler, errorLevels } from "../utils/errorHandler.js";

const create = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "Unauthorized: User not authenticated",
        })
      );
    }

    const newRecord = await UserMealProgress.create({
      ...req.body,
      userId,
    });

    res.status(201).json({
      success: true,
      data: newRecord,
    });
  } catch (error) {
    res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error creating progress entry: " + (error as Error).message,
        userId: req.user?.id || 0,
      })
    );
  }
};

const getByUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const records = await UserMealProgress.findAll({
      where: { userId },
      order: [["date", "DESC"]],
    });

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error fetching progress entries: " + (error as Error).message,
        userId: userId || 0,
      })
    );
  }
};
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const entry = await UserMealProgress.findOne({ where: { id, userId } });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Progress entry not found or unauthorized",
      });
    }

    await entry.update(req.body);

    return res.status(200).json({ success: true, data: entry });
  } catch (error) {
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error updating progress entry: " + (error as Error).message,
        userId: userId || 0,
        genericId: id,
      })
    );
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const entry = await UserMealProgress.findOne({ where: { id, userId } });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Progress entry not found or unauthorized",
      });
    }

    await entry.destroy();

    return res.status(200).json({
      success: true,
      message: "Progress entry deleted",
    });
  } catch (error) {
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error deleting progress entry: " + (error as Error).message,
        userId: userId || 0,
        genericId: id,
      })
    );
  }
};

export const UserMealProgressController = {
  create,
  getByUser,
  update,
  remove,
};
