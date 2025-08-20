export const getTrendingMovies = async (req, res) => {
  try {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/day?language=en-US`,
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
    console.error("Error fetching trending movies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending movies",
      error: error.message,
    });
  }
};

export const getMovieInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
    let trailerKey = null;
    let recommendations = [];

    const response = await fetch(`${TMDB_BASE_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const trailer = await fetch(
      `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const trailerData = await trailer.json();

    if (trailerData.results && trailerData.results.length > 0) {
      trailerData.results = trailerData.results.filter(
        (video) => video.type === "Trailer"
      );
      trailerKey = trailerData.results[0].key;
    }

    const recommendationResponse = await fetch(
      `${TMDB_BASE_URL}/movie/${id}/recommendations?language=en-US&page=1`,
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

    const movieData = await response.json();

    res.json({
      success: true,
      results: {
        ...movieData,
        trailerKey: trailerKey,
        recommendations: recommendations,
      },
    });
  } catch (error) {
    console.error("Error fetching movie info:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie info",
      error: error.message,
    });
  }
};
