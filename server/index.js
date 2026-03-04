// server/index.js
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// CORS configuration - more specific for security
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());

// Debug API key
console.log("🔑 OpenAI API Key present:", !!process.env.OPENAI_API_KEY);
console.log("🔑 API Key starts with:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) + "..." : "MISSING");

// Initialize OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  console.log("✅ Health check received");
  res.json({ 
    status: "OK", 
    message: "BridgeTalk backend is running!",
    timestamp: new Date().toISOString()
  });
});

// POST endpoint for chat
app.post("/api/chat-voice", async (req, res) => {
  console.log("📨 Received chat request:", req.body);
  
  const { user_id, session_id, message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  const systemPrompt = `
You are a friendly AI companion designed for individuals with autism spectrum disorder.  
Your responses must:  
- Avoid harmful or offensive language.  
- Consider the user's age and maturity level.  
- Obey legal restrictions (do not give medical, legal or professional advice beyond general supportive conversation).  
- Encourage safe real-world applications, positive behavior, and learning. Encourage connection with the world.
- Maintain a calm, predictable tone, low emotional volatility, and structured language.  
Respond as a companion, not a therapist or professional.  
`;

  try {
    console.log("🤖 Calling OpenAI API...");
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.5,
    });

    const botText = chatResponse.choices[0].message.content;
    console.log("✅ OpenAI response received:", botText.substring(0, 50) + "...");

    res.json({ 
      reply: botText
    });

  } catch (err) {
    console.error("❌ OpenAI API error:", err);
    res.status(500).json({ 
      error: "OpenAI API error",
      details: err.message 
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat-voice`);
});