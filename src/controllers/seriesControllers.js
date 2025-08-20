export const getTrendingSeries = async (req, res) => {
  try {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    const response = await fetch(
      `${TMDB_BASE_URL}/trending/tv/day?language=en-US`,
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
    console.error("Error fetching trending series:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending series",
      error: error.message,
    });
  }
};

export const getSeriesInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
    let trailerKey = null;
    let recommendations = [];

    const response = await fetch(`${TMDB_BASE_URL}/tv/${id}`, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const trailer = await fetch(
      `${TMDB_BASE_URL}/tv/${id}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const trailerData = await trailer.json();

    if (trailerData.results && trailerData.results.length > 0) {
      // get the first with type of "Trailer"
      trailerData.results = trailerData.results.filter(
        (video) => video.type === "Trailer"
      );
      trailerKey = trailerData.results[0].key; // Get the first trailer key
    }

    const recommendationResponse = await fetch(
      `${TMDB_BASE_URL}/tv/${id}/recommendations?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const recommendationData = await recommendationResponse.json();
    if (recommendationData.results && recommendationData.results.length > 0) {
      recommendations = recommendationData.results;
    }

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: "Failed to fetch series info",
      });
    }

    const data = await response.json();
    res.json({
      success: true,
      results: { ...data, trailerKey, recommendations },
    });
  } catch (error) {
    console.error("Error fetching series info:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch series info",
      error: error.message,
    });
  }
};
