import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  message?: string;
};

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

function prompt_process(num_quiz: number, prompt: string): string {
    let result:string = "Generate `${num_quiz}` MCQ with answer keys, \
    :question comes first and then options, text: {prompt}"
 
    return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const prompt = req.body.prompt;
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt_process(5, prompt)}` }],
    });
    console.log(result.data.choices[0].message);
    const response = result.data.choices[0].message?.content;
    res.status(200).json({ message: response });
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
