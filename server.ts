import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for 24/7 AI Sales & Support Agent
  app.post("/api/chat", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Messages array is required." });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not defined. Using friendly local fallback response.");
        const lastMsg = messages[messages.length - 1]?.content || "";
        res.json({
          text: `[Support Agent Demo]: Aapka message mila: "${lastMsg}". Hum aapse jald hi contact karenge! Standard services pricing aur queries ke liye hume directly humare direct line (+91 90799 11681) par call ya WhatsApp message karein. Shukriya!`
        });
        return;
      }

      // Initialize Google Gen AI client with appropriate telemetry header
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const systemInstruction = 
        "You are 'VA Digital Support Bot' (or 'VA AI Agent'), an elite and friendly 24/7 AI Sales & Support Agent representing VA Digital, a premium website design & local business SEO agency based in Jaipur, Rajasthan, India. " +
        "You speak English, Hindi, and especially HINGLISH fluently and switch styles naturally depending on how the client asks questions. Hinglish is highly preferred for local shop owners and vendors in India to keep them comfortable (e.g. mix Hindi and English exactly like real humans: 'Ji, hum web design starting from low cost me kar ke denge!', 'Aapki local business shop ko Google Maps par rank karvayenge taaki local log aapse contact karein.'). " +
        "We help local businesses (like restaurants, doctors, gyms, real estate, lawyers, local shops, clothing brands etc.) establish a strong online presence. Our focal services are: " +
        "1. Sovereign Web Design (Vite SPAs that load in 0.1 seconds, 100% mobile-friendly, secure, professional layouts only—no sluggish WordPress). " +
        "2. Google Business Profile & local SEO map setups (to rank on local maps when users search 'near me'). " +
        "3. Integration of Online Booking systems, booking calendars, and customer capture forms. " +
        "4. WhatsApp conversational marketing funnels and Chatbots. " +
        "Keep your output friendly, brief, conversational, and packed with valuable sales tips. Guide the visitor to share their email, phone number, or business details so our core directors can call them back, or tell them to click the direct Call or WhatsApp CTA channels links. " +
        "Never mention API, systems configurations, or tokens. Be standard digital sales representative.";

      // Formulate history context for gemini-3.5-flash
      const historyParts = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      // Call Gemini 3.5 Flash for high performance text generation
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: historyParts,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Aapka message high priority me save ho gaya hai. Aap directly +91 90799 11681 par hume Call ya WhatsApp kar sakte hain.";
      res.json({ text: replyText });

    } catch (err: any) {
      console.error("Gemini API backend error:", err);
      res.status(500).json({ error: "Agent support network query error. Let's try again in a bit!" });
    }
  });

  // Serve static assets or mount Vite Developer Middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production static serving mode.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
