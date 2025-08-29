import { Router } from "express";
import {
  testGemini,
  generateContent,
  getMoodBasedRecommendation,
  getMoodBasedRecommendationById,
} from "../controllers/geminiControllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Gemini AI routes" });
});

// Test Gemini API connection
router.get("/test", testGemini);

// Generate content with Gemini
router.post("/generate", generateContent);

// Get movie recommendation based on mood (search method)
router.post("/mood-recommendation", getMoodBasedRecommendation);

// Get movie recommendation based on mood (direct ID method)
router.post("/mood-recommendation-id", getMoodBasedRecommendationById);

export default router;
