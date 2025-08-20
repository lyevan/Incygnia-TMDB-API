import { Router } from "express";
import {
  getTrendingSeries,
  getSeriesInfo,
} from "../controllers/seriesControllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to series routes" });
});

// Get trending series
router.get("/trending", getTrendingSeries);
router.get("/info/:id", getSeriesInfo);

export default router;
