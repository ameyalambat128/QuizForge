import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  message?: string;
};

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const prompt = req.body.prompt;
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate 10 multiple choices questions with answer keys that have a format like "Answer: " where question comes first and a new line after the question and then 4 options for each question and another line break before the Answer, text: ${prompt}. Make sure the answer is either A, B, C, or D. Don't put too many answers as the same letter choice.` ,
        },
      ],
    });
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
