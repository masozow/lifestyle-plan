
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY!,
  baseURL: 'https://api.deepseek.com',
});

export default openai;

