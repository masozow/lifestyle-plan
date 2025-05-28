import openai from "../config/openai.js";
import { Request, Response } from 'express';
import { prompt } from "../helpers/prompt.js";

const sendPlanPrompt = async (req: Request, res: Response) => {
  const { 
    objective, 
    restriction, 
    preference, 
    extras,
    weight,
    height,
    age,
    waist,
    neck,
    hip,
    gender
  } = req.body;

  if (!weight || !height || !age || !waist || !neck || !gender || !objective) {
    return res.status(400).json({ 
      error: "Missing required fields" 
    });
  }

  try {
    // Get raw text response first (workaround for Groq's strict JSON validation)
    const completion = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { 
          role: "system", 
          content: `You are a nutritionist AI that creates detailed meal plans.
                   Respond with PURE JSON only, no commentary or markdown.` 
        },
        { 
          role: "user", 
          content: prompt(
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
          )
        }
      ],
      temperature: 0.5,
      max_tokens: 2000
    });

    // Clean and parse the response
    let responseText = completion.choices[0].message.content;
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const mealPlan = JSON.parse(responseText);

    if (!mealPlan.daily_calorie_target || !mealPlan.weekly_plan) {
      throw new Error("Incomplete meal plan structure");
    }

    return res.json({
      ...mealPlan,
      meta: {
        generated_at: new Date().toISOString(),
        model: "llama3-70b-8192"
      }
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      error: "Meal plan generation failed",
      details: error.message
    });
  }
};

// Keep your original export style
const openaiController = {
  sendPlanPrompt
};

export default openaiController;