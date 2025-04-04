"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in environment variables");
}

export const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateQuestions(inputPrompt: string) {
  try {
    console.log("Starting question generation with prompt:", inputPrompt);
    
    const {
      object: { questions },
    } = await generateObject({
      model: groq.chat("llama-3.3-70b-versatile"),
      schema: z.object({
        questions: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        ),
      }),
      prompt: inputPrompt,
      temperature: 0.7,
      maxTokens: 2048,
    });

    if (!questions || !Array.isArray(questions)) {
      throw new Error("Invalid response format from Groq API");
    }

    console.log("Successfully generated questions:", questions.length);
    return questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate questions");
  }
}

// console.log(
//   generateQuestions(
//     "job position- junior dev intern, Job Description- react, js, html, css, Years of Experience - 1 , Depending on Job Position, Job Description & Years of Experience give us minimum Interview question along with answer"
//   ).then((questions) => {
//     console.log(questions);
//   })
// );
export default generateQuestions;
