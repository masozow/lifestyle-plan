import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || '', 
  baseURL: "https://api.deepseek.com/v1",
  defaultHeaders: {
    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
  }
});

export default openai;