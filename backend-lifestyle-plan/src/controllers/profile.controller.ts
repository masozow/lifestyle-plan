import { Request, Response } from "express";
import Profile from "../models/profile.model.js";

export const ProfileController = {
  async create(req: Request, res: Response) {
    try {
      const newProfile = await Profile.create(req.body);
      res.status(201).json({ success: true, data: newProfile });
    } catch (err) {
      res.status(400).json({ success: false, error: (err as Error).message });
    }
  },

  async getAll(_: Request, res: Response) {
    try {
      const profiles = await Profile.findAll();
      res.status(200).json({ success: true, data: profiles });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  }
};
