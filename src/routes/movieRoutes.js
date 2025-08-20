import Router from "express";
import {
  getTrendingMovies,
  getMovieInfo,
} from "../controllers/movieControllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to movie routes" });
});

//Get trending movies
router.get("/trending", getTrendingMovies);
router.get("/info/:id", getMovieInfo);
//Get trailers
//Get info

export default router;
