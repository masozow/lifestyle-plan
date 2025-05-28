import openai from "../config/deepseek";
import { Request, Response } from 'express';
// import { errorAndLogHandler } from "../utils";

const sendPlanPrompt = async (req: Request, res: Response) => {
  const { professional, fitness, nutrition, hobby } = req.body;

  const prompt = `
You are a personal lifestyle planning assistant. Generate a weekly plan based on the following objectives:

- Professional: ${professional}
- Fitness: ${fitness}
- Nutrition: ${nutrition}
- Hobby: ${hobby}

The plan should be divided by days and areas, with practical and motivational recommendations.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a lifestyle planning assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const result = completion.choices[0].message.content;
    res.json({ plan: result });
  } catch (error) {
    console.error("Error generating the plan:", error);
    res.status(500).json({ error: "Error generating the plan." });
  }
}

const deepSeekController = {
  sendPlanPrompt,
};

export default deepSeekController;