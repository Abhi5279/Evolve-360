import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generic Gemini JSON runner
 * - Uses generateContent (your proven method)
 * - Extracts JSON safely
 * - Reusable across the entire backend
 */
export async function runGeminiJSON({
  prompt,
  model = "gemini-2.5-flash"
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not found");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const genModel = genAI.getGenerativeModel({ model });

  const result = await genModel.generateContent(prompt);
  const raw = result.response.text();

  // ✅ Safe JSON extraction (same pattern you trust)
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No valid JSON found in Gemini response");
  }

  return JSON.parse(raw.slice(start, end + 1));
}
