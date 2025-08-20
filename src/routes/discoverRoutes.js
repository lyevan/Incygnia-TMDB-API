import { Router } from "express";
import { getTrendingShows } from "../controllers/discoverControllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to discover routes" });
});

//Get trending shows
router.get("/trending", getTrendingShows);

export default router;
