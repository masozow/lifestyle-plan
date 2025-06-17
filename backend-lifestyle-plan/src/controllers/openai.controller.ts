import { Request, Response } from "express";
import { prompt } from "../helpers/openAI/prompt.js";
import { getCompletion } from "../helpers/openAI/completion.js";
import { errorAndLogHandler, errorLevels } from "../utils/index.js";
import { UserPrompt, OpenAIResponse,UserMealProgress, UserDailyMeal, UserDailyIntake } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import { upsertMealPlanStructure } from "./upsertMealPlanStructure.js";

const sendPlanPrompt = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json(
      await errorAndLogHandler({
        level: errorLevels.warn,
        message: "Unauthorized: Missing user ID from token",
      })
    );
  }

  const {
    objective,
    restriction,
    preference,
    extras,
    language,
    unitSystem,
    weight,
    height,
    age,
    waist,
    neck,
    hip,
    gender,
  } = req.body;

  if (!unitSystem || !language || !weight || !height || !age || !waist || !neck || !gender || !objective) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const t = await sequelize.transaction(); 

  try {
    const model = "llama-3.3-70b-versatile";
    const promptText = prompt(
      unitSystem,
      language,
      weight,
      height,
      age,
      waist,
      neck,
      hip,
      gender,
      objective,
      restriction,
      preference,
      extras
    );

    const completion = await getCompletion(
      model,
      "system",
      `You are a nutritionist AI that creates detailed meal plans. Respond with PURE JSON only, no commentary or markdown.`,
      "user",
      promptText,
      0.76,
      4290
    );

    const mealPlan = JSON.parse(completion);

    
    if (!mealPlan.daily_calorie_target || !Array.isArray(mealPlan.weekly_plan)) {
      throw new Error("OpenAI response is missing required fields.");
    }

    
    const userPrompt = await UserPrompt.create({ ...req.body, userId }, { transaction: t });

    
    const response = await OpenAIResponse.create(
      {
        userPromptId: userPrompt.id,
        userId,
        response: {
          ...mealPlan,
          meta: {
            generated_at: new Date().toISOString(),
            model,
          },
        },
      },
      { transaction: t }
    );
    
    await upsertMealPlanStructure({
      userId,
      openAIResponseId: response.id, 
      weeklyPlan: mealPlan.weekly_plan,
      transaction: t,
    });
    await t.commit(); 

    return res.status(201).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "User prompt and OpenAI response created",
        shouldSaveLog: true,
        userId,
        genericId: userPrompt.id.toString(),
      })
    );
  } catch (error) {
    await t.rollback(); 
    return res.status(400).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error creating OpenAI plan: " + (error as Error).message,
        userId: userId || 0,
      })
    );
  }
};

export const OpenAI = {
  sendPlanPrompt,
};
