import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeQuery(query) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents:
      `"Find ${query} and provide a list of 5 establishments with address, phone number, opening hours, website, rating, information about the establishment and 5 latest reviews."`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            placeName: { type: Type.STRING, },
            placeAddress: { type: Type.STRING, },
            placePhone: { type: Type.STRING, },
            placeHours: { type: Type.STRING, },
            placeWebsite: { type: Type.STRING, },
            placeRating: { type: Type.STRING, },
            placeInfo: { type: Type.STRING, },
            placeReviews: {
              type: Type.ARRAY,
              items: { type: Type.STRING, },
            },
          },
          propertyOrdering: ["placeName", "placeAddress", "placePhone", "placeHours", "placeWebsite", "placeRating", "placeInfo", "placeReviews"],
        },
      },
    },
  });

  console.log(response.text);
}
