import { Router } from "express";
import {
  getTrendingShows,
  searchMulti,
} from "../controllers/discoverControllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to discover routes" });
});

//Get trending shows
router.get("/trending", getTrendingShows);

//Search for movies and TV shows
router.get("/search", searchMulti);

export default router;
