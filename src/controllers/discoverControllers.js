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

export const searchMulti = async (req, res) => {
  try {
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    if (!TMDB_BASE_URL || !TMDB_ACCESS_TOKEN) {
      return res.status(500).json({
        message: "Missing TMDB configuration",
        error: "TMDB_BASE_URL or TMDB_ACCESS_TOKEN not found",
      });
    }

    const { query, page = 1 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=${page}`,
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

    // Filter results based on your requirements
    const filteredResults = data.results
      .filter((item) => {
        // Only allow 'tv' and 'movie' media types
        if (item.media_type !== "tv" && item.media_type !== "movie") {
          return false;
        }

        // Check for release date
        if (item.media_type === "movie") {
          // For movies, check if release_date exists and is not empty
          return item.release_date && item.release_date.trim() !== "";
        } else if (item.media_type === "tv") {
          // For TV shows, check if first_air_date exists and is not empty
          return item.first_air_date && item.first_air_date.trim() !== "";
        }

        return false;
      })
      .map((item) => {
        // Clean up and standardize the response
        return {
          adult: item.adult || false,
          backdrop_path: item.backdrop_path || null,
          id: item.id || 0,
          title: item.media_type === "movie" ? item.title : item.name,
          original_language: item.original_language || "",
          original_title:
            item.media_type === "movie"
              ? item.original_title
              : item.original_name,
          overview: item.overview || "",
          poster_path: item.poster_path || null,
          media_type: item.media_type,
          genre_ids: item.genre_ids || [],
          popularity: item.popularity || 0,
          release_date:
            item.media_type === "movie"
              ? item.release_date
              : item.first_air_date,
          video: item.video || false,
          vote_average: item.vote_average || 0,
          vote_count: item.vote_count || 0,
        };
      });

    // Return filtered and formatted data
    return res.json({
      success: true,
      page: data.page,
      results: filteredResults,
      total_pages: data.total_pages,
      total_results: filteredResults.length,
      original_total_results: data.total_results,
    });
  } catch (error) {
    console.error("Error searching multi:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search",
      error: error.message,
    });
  }
};
