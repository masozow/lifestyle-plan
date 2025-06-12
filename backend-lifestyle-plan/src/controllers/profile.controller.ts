  import { Request, Response } from "express";
  import {Profile} from "../models/index.js";
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

    const profile = await Profile.create({ ...req.body, userId });

    res.status(201).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "Profile created",
        shouldSaveLog: true,
        userId,
        genericId: profile?.id?.toString(),
      })
    );
  } catch (error) {
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error creating profile: " + (error as Error).message,
        userId: req.user?.id || 0,
      })
    );
  }
};

  const getAll = async (req: Request, res: Response) => {
    try {
      const profiles = await Profile.findAll();

      return res.status(200).json({ success: true, data: profiles });
    } catch (error) {
      res.status(500).json(
        await errorAndLogHandler({
          level: errorLevels.error,
          message: `Error fetching profiles: ` + error.message,
          // userId: req.user?.id || 0,
          userId:0
        })
      );
    }
  };

  const getByUserID = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const profile = await Profile.findOne({ where: { userId: userId } });
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      res.status(500).json(
        await errorAndLogHandler({
          level: errorLevels.error,
          message: `Error fetching the profile: ${userId} ` + error.message,
          // userId: req.user.id,
          userId:0,
          genericId: userId,
        })
      );
    }
  };

  export const ProfileController = {
    create,
    getAll,
    getByUserID
  };
