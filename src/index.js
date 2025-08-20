import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import discoverRoutes from "./routes/discoverRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = `${process.env.API_BASE_URL}${process.env.API_VERSION}`;
const PORT = process.env.PORT || 3000;

// Base routes
app.use(`${BASE_URL}/discover`, discoverRoutes);
app.use(`${BASE_URL}/movie`, movieRoutes);
app.use(`${BASE_URL}/series`, seriesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Incygnia's TMDB API!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
