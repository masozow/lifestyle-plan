import { Request, Response } from 'express';
import { prompt } from "../helpers/openAI/prompt.js";
import { getCompletion } from "../helpers/openAI/completion.js";
import mockDataToShapeFrontend  from '../db/mockDataToShapeFrontend.json' with { type: 'json' };import { errorAndLogHandler, errorLevels } from '../utils/index.js';
;
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
      gender
    } = req.body;

  if (!unitSystem||!language||!weight || !height || !age || !waist || !neck || !gender || !objective) {
    res.status(400).json({ 
      error: "Missing required fields" 
    });
    return;
  }

  try {
    const model="llama-3.3-70b-versatile";
    const pr = prompt(
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
      `You are a nutritionist AI that creates detailed meal plans. 
       Respond with PURE JSON only, no commentary or markdown.`,
      "user",
      pr,
      0.76,
      4290
    );
    const mockCompletion=mockDataToShapeFrontend;
    const mealPlan = JSON.parse(completion);

    if (!mealPlan.daily_calorie_target || !mealPlan.weekly_plan) {
      throw new Error("Incomplete meal plan structure");
    }

    res.json({
      ...mealPlan,
      meta: {
        generated_at: new Date().toISOString(),
        model: model
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: "Meal plan generation failed",
      details: error.message
    });
  }
};

export const OpenAI = {
  sendPlanPrompt
};