import openai from "../config/deepseek.js";
import { Request, Response } from 'express';
// import { errorAndLogHandler } from "../utils";

const sendPlanPrompt = async (req: Request, res: Response) => {
  const { objective, restriction, preference, extras } = req.body;

  const prompt = `
You are a nutritionist AI. Create a **7-day personalized meal plan** based on the following criteria:
- **Primary Goal**: ${objective} (e.g., lose fat, gain muscle, maintain weight).
- **Dietary Restrictions**: ${restriction} (e.g., none, vegan, gluten-free).
- **Food Preferences**: ${preference} (e.g., Latin, Mediterranean, Asian).
- **Additional Notes**: ${extras || "None"}.

**Requirements**:
1. Include breakfast, lunch, dinner, and 2 snacks per day.
2. Specify portion sizes and macronutrient breakdown (carbs, protein, fats).
3. Add quick recipes or preparation tips where relevant.
4. Keep it practical and culturally appropriate.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { 
          role: "system", 
          content: "You are a professional nutritionist. Provide clear, science-backed meal plans." 
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500, // Increased for detailed meal plans
    });

    const mealPlan = completion.choices[0].message.content;
    res.json({ mealPlan });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({ error: "Failed to generate meal plan." });
  }
};

const deepSeekController = {
  sendPlanPrompt,
};

export default deepSeekController;