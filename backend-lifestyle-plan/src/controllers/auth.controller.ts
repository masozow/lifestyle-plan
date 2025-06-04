import { Request, Response } from "express";
import { User } from "../models/index.js";
import { comparePassword } from "../utils/encryption.js";
import { tokenSign, verifyToken } from "../utils/generateToken.js";
import { errorAndLogHandler, errorLevels } from "../utils/errorHandler.js";


/**
 * Authenticates a user and issues a JWT token.
 * @param req - Request with body containing `email` and `password`.
 * @param res - Response with the JWT token as a cookie and a JSON response with a success or error message.
 *
 * @throws {Error} If the user is not found or the password is incorrect, an error is thrown with a 404 or 401 status code, respectively.
 * @throws {Error} If an error occurs while generating the token, an error is thrown with a 500 status code.
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    console.log("Email:", email);
    console.log("User from DB:", user);
    console.log("Password from DB:", user?.password);
    console.log("Password from request:", password);
    if (!user || typeof user.password !== "string") {
      return res.status(404).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "User not found",
        })
      );
    }
    

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "Incorrect password",
        })
      );
    }

    const token = await tokenSign({
      id: user.id,
      email: user.email,
      name: user.name,
      roleId: user.roleId,
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: `Welcome ${user.name}`,
        userId: user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error: any) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Login failed: " + error.message,
      })
    );
  }
};


/**
 * Logs out the user by clearing the JWT token cookie.
 * @param req - Request with the JWT token cookie.
 * @param res - Response with a JSON response containing a success or error message.
 *
 * @throws {Error} If the JWT token cookie is invalid or missing, an error is thrown with a 400 status code.
 * @throws {Error} If an error occurs while clearing the JWT token cookie, an error is thrown with a 500 status code.
 */
const logout = async (req: Request, res: Response) => {
  try {
    const token = req.signedCookies.authToken;

    if (!token) {
      return res.status(400).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "No active session",
        })
      );
    }

    res.clearCookie("authToken", {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "strict",
    });

    return res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "Successfully logged out",
      })
    );
  } catch (error: any) {
    return res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Logout error: " + error.message,
        // userId: req.user?.id,
        userId:0
      })
    );
  }
};

export const AuthController = {
  login,
  logout,
};
