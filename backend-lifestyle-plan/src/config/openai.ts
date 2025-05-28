import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is missing from environment");

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1",
  defaultHeaders: {
    'Authorization': `Bearer ${apiKey}`
  }
  // baseURL: "https://api.deepseek.com/v1"
});

export default openai;