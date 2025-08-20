export const getTrendingShows = async (req, res) => {
  try {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    console.log("Environment check:", {
      TMDB_BASE_URL: TMDB_BASE_URL ? "Set" : "Missing",
      TMDB_ACCESS_TOKEN: TMDB_ACCESS_TOKEN ? "Set" : "Missing",
    });

    if (!TMDB_BASE_URL || !TMDB_ACCESS_TOKEN) {
      return res.status(500).json({
        message: "Missing TMDB configuration",
        error: "TMDB_BASE_URL or TMDB_ACCESS_TOKEN not found",
        env_check: {
          TMDB_BASE_URL: !!TMDB_BASE_URL,
          TMDB_ACCESS_TOKEN: !!TMDB_ACCESS_TOKEN,
        },
      });
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/trending/all/day?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Return the data to the client
    return res.json({
      success: true,
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });
  } catch (error) {
    console.error("Error fetching trending shows:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trending shows",
      error: error.message,
    });
  }
};
