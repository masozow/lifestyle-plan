import { Request, Response } from "express";
import Profile from "../models/profile.model.js";
import { errorAndLogHandler, errorLevels } from "../utils/errorHandler.js";

export const ProfileController = {
  async create(req: Request, res: Response) {
    try {
      const profile = await Profile.create(req.body);

      res.status(201).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "Profile created",
        shouldSaveLog: true,
        userId: req.user?.id,
        genericId: profile?.id?.toString(),
      })
    );

    } catch (error) {
      return res.status(400).json(
        await errorAndLogHandler({
          level: errorLevels.error,
          message: "Error creating profile: " + (error as Error).message,
          userId: req.user?.id,
        })
      );
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const profiles = await Profile.findAll();

      return  res.status(200).json({ success: true, data: profiles });
    } catch (error) {
      res.status(500).json(
        await errorAndLogHandler({
          level: errorLevels.error,
          message: `Error obteniendo los clientes: ` + error.message,
          userId: req.user.id,
        })
      );
    }
  }
};
