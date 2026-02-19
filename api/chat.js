import { portfolioData } from "../src/data/portfolioData.js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MAX_RETRIES = 2;
const TIMEOUT = 25000;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { message } = req.body || {};

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "Message is required and must be a string" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY environment variable is not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const systemPrompt = `You are an AI assistant for Atif Afsar's portfolio website. Your role is to answer questions about Atif's skills, experience, projects, and professional background.

Here is Atif's portfolio data:
${JSON.stringify(portfolioData, null, 2)}

Guidelines:
- Answer questions ONLY based on the portfolio data provided above
- Be helpful, professional, and concise
- If a question is unrelated to Atif's portfolio, skills, projects, or experience, politely respond: "I'm specifically designed to answer questions about Atif Afsar's portfolio and professional background. Please ask me about his skills, projects, experience, or other portfolio-related information."
- Provide accurate information from the portfolio data
- Be friendly and engaging in your responses`;

    let lastError;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

        const response = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: message,
              },
            ],
            temperature: 0.7,
            max_tokens: 1024,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          lastError = `Groq API error: ${response.status} - ${errorData.error?.message || response.statusText}`;

          if (response.status === 429 && attempt < MAX_RETRIES) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
            continue;
          }

          return res.status(200).json({ reply: "AI is currently unavailable. Please try again later." });
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          return res.status(200).json({ reply: "AI is currently unavailable. Please try again later." });
        }

        const aiResponse = data.choices[0].message.content;
        return res.status(200).json({ reply: aiResponse });
      } catch (error) {
        lastError = error.message;
        if (attempt < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }

    console.error("Chat API failed after retries:", lastError);
    return res.status(200).json({ reply: "AI is currently unavailable. Please try again later." });
  } catch (error) {
    console.error("Chat API error:", error.message);
    return res.status(200).json({ reply: "AI is currently unavailable. Please try again later." });
  }
}
