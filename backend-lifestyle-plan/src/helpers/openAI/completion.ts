import openai from "../../config/openai.js";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

type MessageRole = ChatCompletionMessageParam['role'];

interface CompletionParams {
  model: string;
  messageRole: MessageRole;
  messageContent: string;
  promptRole: MessageRole;
  promptContent: string;
  temperature: number;
  max_tokens: number;
}

export const getCompletion = async (
  model: any,
  messageRole: any,
  messageContent: any,
  promptRole: any,
  promptContent: any,
  temperature: any,
  max_tokens: any
) => {
  const completion = await openai.chat.completions.create({
    "messages": [
      { 
        "role": messageRole, 
        "content": messageContent 
      },
      { 
        "role": promptRole, 
        "content": promptContent 
      }
    ], 
    "model":model,
    "temperature":temperature,
    "max_completion_tokens":max_tokens,
    "top_p": 1,
    "stream": false,
    "response_format": {
    "type": "json_object"
  },
  "stop": null
  });
  const responseText = completion?.choices[0]?.message?.content;
  console.log("Data from groq:",responseText);
  return responseText;
};