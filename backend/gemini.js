import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "де на Оболоні ветеринарні аптеки",
  });
  console.log(response.text);
}
