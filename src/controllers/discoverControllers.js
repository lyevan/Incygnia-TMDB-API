export const getTrendingShows = async (req, res) => {
  try {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    if (!TMDB_BASE_URL || !TMDB_ACCESS_TOKEN) {
      return res.status(500).json({
        message: "Missing TMDB configuration",
        error: "TMDB_BASE_URL or TMDB_ACCESS_TOKEN not found",
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

    const data = await response.json();

    // Return the data to the client
    res.json({
      success: true,
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });
  } catch (error) {
    console.error("Error fetching trending shows:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending shows",
      error: error.message,
    });
  }
};
