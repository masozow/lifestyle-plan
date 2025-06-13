// src/controllers/plan.controller.ts
import { Request, Response } from "express";
import { Plan } from "../models/index.js";
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
    console.log(" 🚀 plan.controller line 17:", { file: "plan.controller.ts", function: "create" }, { ...req.body, userId} );
    const plan = await Plan.create({ ...req.body, userId });
    console.log(" 🚀 plan.controller line 20 plan value:", { file: "plan.controller.ts", function: "create" }, plan );
    res.status(201).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "Plan created",
        shouldSaveLog: true,
        userId,
        genericId: plan?.id?.toString(),
      })
    );
  } catch (error) {
    console.log(" 🚀 plan.controller line 26:", { file: "plan.controller.ts", function: "create" }, "Error creating plan:", error);
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error creating plan: " + (error as Error).message,
        userId: req.user?.id || 0,
      })
    );
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const plans = await Plan.findAll();
    return res.status(200).json({ success: true, data: plans });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error fetching plans: " + (error as Error).message,
        userId: req.user?.id || 0,
      })
    );
  }
};

const getByUserID = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const plan = await Plan.findOne({
      where: { userId: userId },
      order: [['updatedAt', 'DESC']],
    });
    return res.status(200).json({ success: true, data: plan });
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error fetching plan by user ID: " + (error as Error).message,
        userId: req.user?.id || 0,
        genericId: userId,
      })
    );
  }
};

export const PlanController = {
  create,
  getAll,
  getByUserID,
};
