// Helper function to validate if movie genre matches user's mood
const validateMoodGenreMatch = (mood, genres) => {
  const moodLower = mood.toLowerCase();
  const genreNames = genres?.map((g) => g.name.toLowerCase()) || [];

  // Define mood-to-genre mappings
  const moodGenreMap = {
    // Happy/positive moods
    happy: ["comedy", "animation", "family", "music", "adventure"],
    energetic: ["action", "adventure", "comedy", "music"],
    uplifting: ["drama", "comedy", "family", "music", "animation"],
    fun: ["comedy", "animation", "adventure", "family"],
    cheerful: ["comedy", "animation", "music", "family"],

    // Sad/emotional moods
    sad: ["drama", "romance", "war", "history"],
    cry: ["drama", "romance", "war"],
    emotional: ["drama", "romance", "biography"],
    melancholy: ["drama", "romance", "mystery"],
    contemplative: ["drama", "mystery", "science fiction", "documentary"],

    // Romance moods
    romantic: ["romance", "drama", "comedy"],
    love: ["romance", "drama"],
    butterflies: ["romance", "comedy"],

    // Adventure/action moods
    adventure: ["adventure", "action", "fantasy", "science fiction"],
    epic: ["adventure", "action", "fantasy", "history", "war"],
    action: ["action", "adventure", "thriller"],

    // Scary/thriller moods
    scared: ["horror", "thriller", "mystery"],
    thrilled: ["thriller", "horror", "action"],
    suspense: ["thriller", "mystery", "crime"],

    // Mind-bending/complex moods
    complex: ["science fiction", "mystery", "thriller", "drama"],
    weird: ["science fiction", "fantasy", "mystery"],
    surreal: ["science fiction", "fantasy", "mystery"],

    // Rebellious/intense moods
    rebellious: ["crime", "thriller", "drama", "action"],
    angry: ["action", "crime", "thriller", "war"],
    intense: ["thriller", "crime", "drama", "action"],
  };

  // Check if any mood keywords match appropriate genres
  for (const [moodKey, allowedGenres] of Object.entries(moodGenreMap)) {
    if (moodLower.includes(moodKey)) {
      const hasMatchingGenre = allowedGenres.some((genre) =>
        genreNames.some((movieGenre) => movieGenre.includes(genre))
      );
      if (hasMatchingGenre) {
        return true;
      }
    }
  }

  // If no specific mood found, be more lenient
  // Only reject obvious mismatches
  const obviousMismatches = [
    // Don't recommend documentaries for entertainment moods
    (moodLower.includes("fun") || moodLower.includes("escape")) &&
      genreNames.includes("documentary"),
    // Don't recommend horror for happy moods
    (moodLower.includes("happy") || moodLower.includes("uplifting")) &&
      genreNames.includes("horror"),
    // Don't recommend comedy for deeply sad moods
    (moodLower.includes("cry") || moodLower.includes("grief")) &&
      genreNames.includes("comedy"),
    // Don't recommend children's content for adult emotional needs
    (moodLower.includes("complex") || moodLower.includes("mature")) &&
      genreNames.includes("family"),
  ];

  return !obviousMismatches.some((mismatch) => mismatch);
};

// Comprehensive fallback movie collections organized by mood
const moodFallbackMovies = {
  // Happy/Uplifting Moods
  happy: [
    508442, // Soul (2020)
    284054, // Black Panther (2018)
    77338, // Inside Out (2015)
    284053, // Thor: Ragnarok (2017)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    568124, // Encanto (2021)
    508943, // Luca (2021)
    527774, // Raya and the Last Dragon (2021)
    14160, // Up (2009)
    862, // Toy Story (1995)
    313369, // La La Land (2016)
    109445, // Frozen (2013)
    420818, // The Lion King (2019)
    10681, // WALL-E (2008)
    782, // Moana (2016)
  ],

  energetic: [
    284054, // Black Panther (2018)
    299536, // Avengers: Infinity War (2018)
    181808, // Star Wars: The Last Jedi (2017)
    1726, // Iron Man (2008)
    335983, // Venom (2018)
    19995, // Avatar (2009)
    27205, // Inception (2010)
    76341, // Mad Max: Fury Road (2015)
    102382, // The Amazing Spider-Man 2 (2014)
    284053, // Thor: Ragnarok (2017)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    155, // The Dark Knight (2008)
    24428, // The Avengers (2012)
    118340, // Guardians of the Galaxy (2014)
    299537, // Captain Marvel (2019)
  ],

  uplifting: [
    13, // Forrest Gump (1994)
    77338, // Inside Out (2015)
    508442, // Soul (2020)
    568124, // Encanto (2021)
    284054, // Black Panther (2018)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    508943, // Luca (2021)
    527774, // Raya and the Last Dragon (2021)
    284053, // Thor: Ragnarok (2017)
    862, // Toy Story (1995)
    14160, // Up (2009)
    37165, // The Pursuit of Happyness (2006)
    313369, // La La Land (2016)
    109445, // Frozen (2013)
    420818, // The Lion King (2019)
  ],

  fun: [
    862, // Toy Story (1995)
    863, // Toy Story 2 (1999)
    10193, // Toy Story 3 (2010)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    568124, // Encanto (2021)
    508943, // Luca (2021)
    284053, // Thor: Ragnarok (2017)
    259316, // Fantastic Beasts and Where to Find Them (2016)
    109445, // Frozen (2013)
    420818, // The Lion King (2019)
    118340, // Guardians of the Galaxy (2014)
    313369, // La La Land (2016)
    782, // Moana (2016)
    527774, // Raya and the Last Dragon (2021)
    674, // Harry Potter and the Goblet of Fire (2005)
  ],

  cheerful: [
    568124, // Encanto (2021)
    508943, // Luca (2021)
    77338, // Inside Out (2015)
    284053, // Thor: Ragnarok (2017)
    862, // Toy Story (1995)
    109445, // Frozen (2013)
    313369, // La La Land (2016)
    14160, // Up (2009)
    10681, // WALL-E (2008)
    782, // Moana (2016)
    420818, // The Lion King (2019)
    527774, // Raya and the Last Dragon (2021)
    508442, // Soul (2020)
    118340, // Guardians of the Galaxy (2014)
    429617, // Spider-Man: Into the Spider-Verse (2018)
  ],

  excited: [
    299536, // Avengers: Infinity War (2018)
    24428, // The Avengers (2012)
    284054, // Black Panther (2018)
    1726, // Iron Man (2008)
    118340, // Guardians of the Galaxy (2014)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    284053, // Thor: Ragnarok (2017)
    181808, // Star Wars: The Last Jedi (2017)
    335983, // Venom (2018)
    76341, // Mad Max: Fury Road (2015)
    19995, // Avatar (2009)
    155, // The Dark Knight (2008)
    102382, // The Amazing Spider-Man 2 (2014)
    27205, // Inception (2010)
    299537, // Captain Marvel (2019)
  ],

  optimistic: [
    13, // Forrest Gump (1994)
    37165, // The Pursuit of Happyness (2006)
    508442, // Soul (2020)
    77338, // Inside Out (2015)
    568124, // Encanto (2021)
    284054, // Black Panther (2018)
    313369, // La La Land (2016)
    862, // Toy Story (1995)
    14160, // Up (2009)
    10681, // WALL-E (2008)
    782, // Moana (2016)
    420818, // The Lion King (2019)
    278, // The Shawshank Redemption (1994)
    508943, // Luca (2021)
    118340, // Guardians of the Galaxy (2014)
  ],

  // Sad/Emotional Moods
  sad: [
    37165, // The Pursuit of Happyness (2006)
    77338, // Inside Out (2015)
    14160, // Up (2009)
    278, // The Shawshank Redemption (1994)
    424, // Schindler's List (1993)
    11216, // Cinema Paradiso (1988)
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    12477, // Grave of the Fireflies (1988)
    597, // Titanic (1997)
    11036, // The Notebook (2004)
    551, // Good Will Hunting (1997)
    475557, // Joker (2019)
    508442, // Soul (2020)
    313369, // La La Land (2016)
  ],

  cry: [
    37165, // The Pursuit of Happyness (2006)
    77338, // Inside Out (2015)
    14160, // Up (2009)
    424, // Schindler's List (1993)
    11216, // Cinema Paradiso (1988)
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    12477, // Grave of the Fireflies (1988)
    597, // Titanic (1997)
    11036, // The Notebook (2004)
    551, // Good Will Hunting (1997)
    475557, // Joker (2019)
    508442, // Soul (2020)
    278, // The Shawshank Redemption (1994)
    862, // Toy Story (1995) - emotional moments
  ],

  emotional: [
    37165, // The Pursuit of Happyness (2006)
    77338, // Inside Out (2015)
    475557, // Joker (2019)
    372058, // Your Name (2016)
    424, // Schindler's List (1993)
    11216, // Cinema Paradiso (1988)
    14160, // Up (2009)
    129, // Spirited Away (2001)
    12477, // Grave of the Fireflies (1988)
    508442, // Soul (2020)
    597, // Titanic (1997)
    11036, // The Notebook (2004)
    278, // The Shawshank Redemption (1994)
    551, // Good Will Hunting (1997)
    313369, // La La Land (2016)
  ],

  melancholy: [
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    475557, // Joker (2019)
    550, // Fight Club (1999)
    238, // The Godfather (1972)
    389, // 12 Monkeys (1995)
    11216, // Cinema Paradiso (1988)
    14160, // Up (2009)
    12477, // Grave of the Fireflies (1988)
    10494, // Perfect Blue (1997)
    597, // Titanic (1997)
    77338, // Inside Out (2015)
    508442, // Soul (2020)
    27205, // Inception (2010)
    313369, // La La Land (2016)
  ],

  lonely: [
    77338, // Inside Out (2015)
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    10681, // WALL-E (2008)
    475557, // Joker (2019)
    550, // Fight Club (1999)
    37165, // The Pursuit of Happyness (2006)
    278, // The Shawshank Redemption (1994)
    27205, // Inception (2010)
    508442, // Soul (2020)
    14160, // Up (2009)
    11216, // Cinema Paradiso (1988)
    389, // 12 Monkeys (1995)
    597, // Titanic (1997)
    313369, // La La Land (2016)
  ],

  depressed: [
    37165, // The Pursuit of Happyness (2006)
    278, // The Shawshank Redemption (1994)
    77338, // Inside Out (2015)
    508442, // Soul (2020)
    475557, // Joker (2019)
    550, // Fight Club (1999)
    551, // Good Will Hunting (1997)
    14160, // Up (2009)
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    11216, // Cinema Paradiso (1988)
    238, // The Godfather (1972)
    424, // Schindler's List (1993)
    13, // Forrest Gump (1994)
    313369, // La La Land (2016)
  ],

  heartbroken: [
    597, // Titanic (1997)
    11036, // The Notebook (2004)
    313369, // La La Land (2016)
    372058, // Your Name (2016)
    77338, // Inside Out (2015)
    475557, // Joker (2019)
    129, // Spirited Away (2001)
    14160, // Up (2009)
    550, // Fight Club (1999)
    37165, // The Pursuit of Happyness (2006)
    278, // The Shawshank Redemption (1994)
    551, // Good Will Hunting (1997)
    12477, // Grave of the Fireflies (1988)
    11216, // Cinema Paradiso (1988)
    508442, // Soul (2020)
  ],

  nostalgic: [
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    11216, // Cinema Paradiso (1988)
    862, // Toy Story (1995)
    14160, // Up (2009)
    313369, // La La Land (2016)
    13, // Forrest Gump (1994)
    278, // The Shawshank Redemption (1994)
    238, // The Godfather (1972)
    508442, // Soul (2020)
    77338, // Inside Out (2015)
    424, // Schindler's List (1993)
    12477, // Grave of the Fireflies (1988)
    597, // Titanic (1997)
    551, // Good Will Hunting (1997)
  ],

  // Romance Moods
  romantic: [
    313369, // La La Land (2016)
    19404, // Dilwale Dulhania Le Jayenge (1995)
    597, // Titanic (1997)
    11036, // The Notebook (2004)
    372058, // Your Name (2016)
    10681, // WALL-E (2008)
    782, // Moana (2016)
    420818, // The Lion King (2019)
    109445, // Frozen (2013)
    863, // Toy Story 2 (1999) - has romance elements
    129, // Spirited Away (2001)
    551, // Good Will Hunting (1997)
    13, // Forrest Gump (1994)
    568124, // Encanto (2021)
    508943, // Luca (2021)
  ],

  love: [
    313369, // La La Land (2016)
    19404, // Dilwale Dulhania Le Jayenge (1995)
    597, // Titanic (1997)
    11036, // The Notebook (2004)
    372058, // Your Name (2016)
    10681, // WALL-E (2008)
    109445, // Frozen (2013)
    420818, // The Lion King (2019)
    782, // Moana (2016)
    862, // Toy Story (1995)
    129, // Spirited Away (2001)
    551, // Good Will Hunting (1997)
    13, // Forrest Gump (1994)
    77338, // Inside Out (2015)
    568124, // Encanto (2021)
  ],

  butterflies: [
    313369, // La La Land (2016)
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    10681, // WALL-E (2008)
    597, // Titanic (1997)
    11036, // The Notebook (2004)
    19404, // Dilwale Dulhania Le Jayenge (1995)
    109445, // Frozen (2013)
    782, // Moana (2016)
    420818, // The Lion King (2019)
    863, // Toy Story 2 (1999)
    568124, // Encanto (2021)
    508943, // Luca (2021)
    77338, // Inside Out (2015)
    508442, // Soul (2020)
  ],

  passionate: [
    597, // Titanic (1997)
    313369, // La La Land (2016)
    155, // The Dark Knight (2008)
    238, // The Godfather (1972)
    11036, // The Notebook (2004)
    19404, // Dilwale Dulhania Le Jayenge (1995)
    680, // Pulp Fiction (1994)
    550, // Fight Club (1999)
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    27205, // Inception (2010)
    76341, // Mad Max: Fury Road (2015)
    475557, // Joker (2019)
    284054, // Black Panther (2018)
    278, // The Shawshank Redemption (1994)
  ],

  // Adventure/Action Moods
  adventure: [
    122, // The Lord of the Rings: The Return of the King (2003)
    120, // The Lord of the Rings: The Fellowship of the Ring (2001)
    121, // The Lord of the Rings: The Two Towers (2002)
    1726, // Iron Man (2008)
    19995, // Avatar (2009)
    284054, // Black Panther (2018)
    259316, // Fantastic Beasts and Where to Find Them (2016)
    674, // Harry Potter and the Goblet of Fire (2005)
    782, // Moana (2016)
    527774, // Raya and the Last Dragon (2021)
    299536, // Avengers: Infinity War (2018)
    24428, // The Avengers (2012)
    118340, // Guardians of the Galaxy (2014)
    181808, // Star Wars: The Last Jedi (2017)
    129, // Spirited Away (2001)
  ],

  epic: [
    122, // The Lord of the Rings: The Return of the King (2003)
    120, // The Lord of the Rings: The Fellowship of the Ring (2001)
    121, // The Lord of the Rings: The Two Towers (2002)
    238, // The Godfather (1972)
    424, // Schindler's List (1993)
    19995, // Avatar (2009)
    284054, // Black Panther (2018)
    155, // The Dark Knight (2008)
    278, // The Shawshank Redemption (1994)
    299536, // Avengers: Infinity War (2018)
    24428, // The Avengers (2012)
    181808, // Star Wars: The Last Jedi (2017)
    13, // Forrest Gump (1994)
    129, // Spirited Away (2001)
    27205, // Inception (2010)
  ],

  action: [
    155, // The Dark Knight (2008)
    1726, // Iron Man (2008)
    284054, // Black Panther (2018)
    299536, // Avengers: Infinity War (2018)
    76341, // Mad Max: Fury Road (2015)
    335983, // Venom (2018)
    102382, // The Amazing Spider-Man 2 (2014)
    181808, // Star Wars: The Last Jedi (2017)
    24428, // The Avengers (2012)
    118340, // Guardians of the Galaxy (2014)
    299537, // Captain Marvel (2019)
    27205, // Inception (2010)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    284053, // Thor: Ragnarok (2017)
    680, // Pulp Fiction (1994)
  ],

  // Horror/Thriller Moods
  scared: [
    346364, // It (2017)
    419704, // Ad Astra (2019)
    27205, // Inception (2010)
    550, // Fight Club (1999)
    389, // 12 Monkeys (1995)
    155, // The Dark Knight (2008)
    475557, // Joker (2019)
    10494, // Perfect Blue (1997)
    76341, // Mad Max: Fury Road (2015)
    335983, // Venom (2018)
    680, // Pulp Fiction (1994)
    238, // The Godfather (1972)
    129, // Spirited Away (2001) - can be scary
    372058, // Your Name (2016)
    181808, // Star Wars: The Last Jedi (2017)
  ],

  thrilled: [
    27205, // Inception (2010)
    155, // The Dark Knight (2008)
    346364, // It (2017)
    550, // Fight Club (1999)
    680, // Pulp Fiction (1994)
    389, // 12 Monkeys (1995)
    475557, // Joker (2019)
    419704, // Ad Astra (2019)
    76341, // Mad Max: Fury Road (2015)
    10494, // Perfect Blue (1997)
    299536, // Avengers: Infinity War (2018)
    24428, // The Avengers (2012)
    1726, // Iron Man (2008)
    284054, // Black Panther (2018)
    181808, // Star Wars: The Last Jedi (2017)
  ],

  suspense: [
    27205, // Inception (2010)
    155, // The Dark Knight (2008)
    550, // Fight Club (1999)
    680, // Pulp Fiction (1994)
    238, // The Godfather (1972)
    389, // 12 Monkeys (1995)
    475557, // Joker (2019)
    346364, // It (2017)
    419704, // Ad Astra (2019)
    10494, // Perfect Blue (1997)
    76341, // Mad Max: Fury Road (2015)
    278, // The Shawshank Redemption (1994)
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    597, // Titanic (1997)
  ],

  // Complex/Mind-bending Moods
  complex: [
    27205, // Inception (2010)
    389, // 12 Monkeys (1995)
    550, // Fight Club (1999)
    419704, // Ad Astra (2019)
    10494, // Perfect Blue (1997)
    372058, // Your Name (2016)
    129, // Spirited Away (2001)
    475557, // Joker (2019)
    238, // The Godfather (1972)
    155, // The Dark Knight (2008)
    680, // Pulp Fiction (1994)
    278, // The Shawshank Redemption (1994)
    424, // Schindler's List (1993)
    508442, // Soul (2020)
    77338, // Inside Out (2015)
  ],

  weird: [
    389, // 12 Monkeys (1995)
    10494, // Perfect Blue (1997)
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    550, // Fight Club (1999)
    680, // Pulp Fiction (1994)
    475557, // Joker (2019)
    27205, // Inception (2010)
    419704, // Ad Astra (2019)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    118340, // Guardians of the Galaxy (2014)
    284053, // Thor: Ragnarok (2017)
    77338, // Inside Out (2015)
    508442, // Soul (2020)
    259316, // Fantastic Beasts and Where to Find Them (2016)
  ],

  surreal: [
    10494, // Perfect Blue (1997)
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    389, // 12 Monkeys (1995)
    27205, // Inception (2010)
    550, // Fight Club (1999)
    680, // Pulp Fiction (1994)
    419704, // Ad Astra (2019)
    475557, // Joker (2019)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    77338, // Inside Out (2015)
    508442, // Soul (2020)
    118340, // Guardians of the Galaxy (2014)
    259316, // Fantastic Beasts and Where to Find Them (2016)
    14160, // Up (2009)
  ],

  confused: [
    27205, // Inception (2010)
    389, // 12 Monkeys (1995)
    550, // Fight Club (1999)
    10494, // Perfect Blue (1997)
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    475557, // Joker (2019)
    680, // Pulp Fiction (1994)
    419704, // Ad Astra (2019)
    77338, // Inside Out (2015)
    508442, // Soul (2020)
    238, // The Godfather (1972)
    155, // The Dark Knight (2008)
    278, // The Shawshank Redemption (1994)
    429617, // Spider-Man: Into the Spider-Verse (2018)
  ],

  // Rebellious/Intense Moods
  rebellious: [
    550, // Fight Club (1999)
    680, // Pulp Fiction (1994)
    475557, // Joker (2019)
    155, // The Dark Knight (2008)
    76341, // Mad Max: Fury Road (2015)
    284054, // Black Panther (2018)
    238, // The Godfather (1972)
    389, // 12 Monkeys (1995)
    335983, // Venom (2018)
    27205, // Inception (2010)
    278, // The Shawshank Redemption (1994)
    24428, // The Avengers (2012)
    299536, // Avengers: Infinity War (2018)
    1726, // Iron Man (2008)
    118340, // Guardians of the Galaxy (2014)
  ],

  angry: [
    550, // Fight Club (1999)
    475557, // Joker (2019)
    155, // The Dark Knight (2008)
    76341, // Mad Max: Fury Road (2015)
    680, // Pulp Fiction (1994)
    238, // The Godfather (1972)
    389, // 12 Monkeys (1995)
    335983, // Venom (2018)
    284054, // Black Panther (2018)
    27205, // Inception (2010)
    346364, // It (2017)
    278, // The Shawshank Redemption (1994)
    299536, // Avengers: Infinity War (2018)
    1726, // Iron Man (2008)
    419704, // Ad Astra (2019)
  ],

  intense: [
    155, // The Dark Knight (2008)
    550, // Fight Club (1999)
    27205, // Inception (2010)
    475557, // Joker (2019)
    680, // Pulp Fiction (1994)
    238, // The Godfather (1972)
    76341, // Mad Max: Fury Road (2015)
    389, // 12 Monkeys (1995)
    346364, // It (2017)
    419704, // Ad Astra (2019)
    299536, // Avengers: Infinity War (2018)
    284054, // Black Panther (2018)
    1726, // Iron Man (2008)
    10494, // Perfect Blue (1997)
    278, // The Shawshank Redemption (1994)
  ],

  // Additional Emotional States
  anxious: [
    77338, // Inside Out (2015)
    27205, // Inception (2010)
    155, // The Dark Knight (2008)
    550, // Fight Club (1999)
    475557, // Joker (2019)
    389, // 12 Monkeys (1995)
    419704, // Ad Astra (2019)
    10494, // Perfect Blue (1997)
    346364, // It (2017)
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    508442, // Soul (2020)
    278, // The Shawshank Redemption (1994)
    37165, // The Pursuit of Happyness (2006)
    14160, // Up (2009)
  ],

  stressed: [
    77338, // Inside Out (2015)
    278, // The Shawshank Redemption (1994)
    37165, // The Pursuit of Happyness (2006)
    508442, // Soul (2020)
    14160, // Up (2009)
    129, // Spirited Away (2001)
    13, // Forrest Gump (1994)
    372058, // Your Name (2016)
    10681, // WALL-E (2008)
    862, // Toy Story (1995)
    109445, // Frozen (2013)
    313369, // La La Land (2016)
    420818, // The Lion King (2019)
    782, // Moana (2016)
    568124, // Encanto (2021)
  ],

  hopeful: [
    278, // The Shawshank Redemption (1994)
    37165, // The Pursuit of Happyness (2006)
    13, // Forrest Gump (1994)
    508442, // Soul (2020)
    77338, // Inside Out (2015)
    284054, // Black Panther (2018)
    568124, // Encanto (2021)
    14160, // Up (2009)
    313369, // La La Land (2016)
    862, // Toy Story (1995)
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    782, // Moana (2016)
    420818, // The Lion King (2019)
    527774, // Raya and the Last Dragon (2021)
  ],

  inspired: [
    508442, // Soul (2020)
    284054, // Black Panther (2018)
    37165, // The Pursuit of Happyness (2006)
    278, // The Shawshank Redemption (1994)
    313369, // La La Land (2016)
    568124, // Encanto (2021)
    77338, // Inside Out (2015)
    13, // Forrest Gump (1994)
    429617, // Spider-Man: Into the Spider-Verse (2018)
    782, // Moana (2016)
    527774, // Raya and the Last Dragon (2021)
    420818, // The Lion King (2019)
    14160, // Up (2009)
    862, // Toy Story (1995)
    129, // Spirited Away (2001)
  ],

  contemplative: [
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    508442, // Soul (2020)
    27205, // Inception (2010)
    77338, // Inside Out (2015)
    238, // The Godfather (1972)
    278, // The Shawshank Redemption (1994)
    13, // Forrest Gump (1994)
    14160, // Up (2009)
    11216, // Cinema Paradiso (1988)
    424, // Schindler's List (1993)
    550, // Fight Club (1999)
    475557, // Joker (2019)
    389, // 12 Monkeys (1995)
    419704, // Ad Astra (2019)
  ],

  motivated: [
    284054, // Black Panther (2018)
    37165, // The Pursuit of Happyness (2006)
    278, // The Shawshank Redemption (1994)
    1726, // Iron Man (2008)
    299536, // Avengers: Infinity War (2018)
    24428, // The Avengers (2012)
    155, // The Dark Knight (2008)
    313369, // La La Land (2016)
    13, // Forrest Gump (1994)
    508442, // Soul (2020)
    568124, // Encanto (2021)
    782, // Moana (2016)
    527774, // Raya and the Last Dragon (2021)
    420818, // The Lion King (2019)
    429617, // Spider-Man: Into the Spider-Verse (2018)
  ],

  peaceful: [
    129, // Spirited Away (2001)
    372058, // Your Name (2016)
    508442, // Soul (2020)
    14160, // Up (2009)
    10681, // WALL-E (2008)
    77338, // Inside Out (2015)
    568124, // Encanto (2021)
    508943, // Luca (2021)
    782, // Moana (2016)
    109445, // Frozen (2013)
    420818, // The Lion King (2019)
    862, // Toy Story (1995)
    11216, // Cinema Paradiso (1988)
    13, // Forrest Gump (1994)
    278, // The Shawshank Redemption (1994)
  ],

  restless: [
    27205, // Inception (2010)
    155, // The Dark Knight (2008)
    550, // Fight Club (1999)
    680, // Pulp Fiction (1994)
    475557, // Joker (2019)
    76341, // Mad Max: Fury Road (2015)
    389, // 12 Monkeys (1995)
    419704, // Ad Astra (2019)
    346364, // It (2017)
    299536, // Avengers: Infinity War (2018)
    284054, // Black Panther (2018)
    1726, // Iron Man (2008)
    118340, // Guardians of the Galaxy (2014)
    10494, // Perfect Blue (1997)
    335983, // Venom (2018)
  ],
};

// Helper function to get fallback movie ID based on mood
const getMoodFallbackMovie = (mood) => {
  const moodLower = mood.toLowerCase();

  // Create an array to store all potential mood matches
  const moodMatches = [];

  // Find all matching mood categories with priority scoring
  for (const [moodKey, movieIds] of Object.entries(moodFallbackMovies)) {
    if (moodLower.includes(moodKey)) {
      // Give higher priority to exact matches and more specific moods
      const priority = moodKey.length; // Longer mood words get higher priority
      moodMatches.push({ moodKey, movieIds, priority });
    }
  }

  // Sort by priority (longer mood words first)
  moodMatches.sort((a, b) => b.priority - a.priority);

  // If we found specific mood matches, use the highest priority one
  if (moodMatches.length > 0) {
    const bestMatch = moodMatches[0];
    const randomIndex = Math.floor(Math.random() * bestMatch.movieIds.length);
    console.log(
      `Fallback mood match: "${bestMatch.moodKey}" for mood: "${mood}"`
    );
    return bestMatch.movieIds[randomIndex];
  }

  // Advanced mood detection using keyword analysis
  const moodKeywords = {
    // Positive emotions
    positive: [
      "good",
      "great",
      "awesome",
      "fantastic",
      "wonderful",
      "amazing",
      "excellent",
      "joyful",
      "delighted",
      "elated",
    ],
    negative: [
      "bad",
      "terrible",
      "awful",
      "horrible",
      "depressing",
      "miserable",
      "devastated",
      "broken",
      "hurt",
      "pain",
    ],
    energy: [
      "pumped",
      "hyped",
      "energized",
      "adrenaline",
      "rush",
      "excited",
      "amped",
      "charged",
      "dynamic",
    ],
    calm: [
      "relaxed",
      "peaceful",
      "serene",
      "tranquil",
      "zen",
      "meditative",
      "quiet",
      "still",
      "gentle",
    ],
    fear: [
      "afraid",
      "terrified",
      "spooked",
      "nervous",
      "worried",
      "panicked",
      "frightened",
      "anxious",
    ],
    love: [
      "loving",
      "affectionate",
      "romantic",
      "attracted",
      "infatuated",
      "devoted",
      "adoring",
      "smitten",
    ],
    anger: [
      "mad",
      "furious",
      "livid",
      "enraged",
      "irritated",
      "annoyed",
      "hostile",
      "aggressive",
      "outraged",
    ],
    adventure: [
      "exploring",
      "journey",
      "quest",
      "discovery",
      "expedition",
      "voyage",
      "wanderlust",
    ],
    mystery: [
      "curious",
      "puzzled",
      "mysterious",
      "enigmatic",
      "intrigued",
      "questioning",
      "investigative",
    ],
  };

  // Check for keyword matches
  for (const [category, keywords] of Object.entries(moodKeywords)) {
    for (const keyword of keywords) {
      if (moodLower.includes(keyword)) {
        console.log(
          `Fallback keyword match: "${keyword}" -> category: "${category}" for mood: "${mood}"`
        );

        // Map keyword categories to mood categories
        const categoryMoodMap = {
          positive: "happy",
          negative: "sad",
          energy: "energetic",
          calm: "peaceful",
          fear: "scared",
          love: "romantic",
          anger: "angry",
          adventure: "adventure",
          mystery: "complex",
        };

        const mappedMood = categoryMoodMap[category];
        if (mappedMood && moodFallbackMovies[mappedMood]) {
          const movieIds = moodFallbackMovies[mappedMood];
          const randomIndex = Math.floor(Math.random() * movieIds.length);
          return movieIds[randomIndex];
        }
      }
    }
  }

  // Emotional intensity detection
  const intensityKeywords = {
    high: [
      "extremely",
      "very",
      "super",
      "really",
      "incredibly",
      "totally",
      "completely",
      "absolutely",
    ],
    medium: ["quite", "pretty", "fairly", "somewhat", "rather", "moderately"],
    low: ["a bit", "slightly", "kind of", "sort of", "little bit", "mildly"],
  };

  let intensity = "medium"; // default
  for (const [level, keywords] of Object.entries(intensityKeywords)) {
    for (const keyword of keywords) {
      if (moodLower.includes(keyword)) {
        intensity = level;
        break;
      }
    }
  }

  // Default fallback collections based on common emotional needs
  const defaultCollections = {
    high_intensity: [
      155, // The Dark Knight (2008) - intense drama
      27205, // Inception (2010) - mind-bending
      550, // Fight Club (1999) - psychological
      475557, // Joker (2019) - intense character study
      299536, // Avengers: Infinity War (2018) - epic action
      284054, // Black Panther (2018) - powerful themes
      238, // The Godfather (1972) - classic drama
      680, // Pulp Fiction (1994) - intense narrative
      76341, // Mad Max: Fury Road (2015) - high-octane action
      419704, // Ad Astra (2019) - existential journey
    ],

    medium_intensity: [
      278, // The Shawshank Redemption (1994) - hopeful drama
      13, // Forrest Gump (1994) - life journey
      77338, // Inside Out (2015) - emotional intelligence
      508442, // Soul (2020) - life reflection
      313369, // La La Land (2016) - dreams and love
      372058, // Your Name (2016) - beautiful story
      129, // Spirited Away (2001) - magical journey
      37165, // The Pursuit of Happyness (2006) - perseverance
      14160, // Up (2009) - adventure and heart
      551, // Good Will Hunting (1997) - personal growth
    ],

    low_intensity: [
      862, // Toy Story (1995) - comfort and nostalgia
      109445, // Frozen (2013) - feel-good musical
      568124, // Encanto (2021) - family and magic
      508943, // Luca (2021) - coming of age
      782, // Moana (2016) - adventure and self-discovery
      420818, // The Lion King (2019) - timeless story
      10681, // WALL-E (2008) - gentle sci-fi romance
      527774, // Raya and the Last Dragon (2021) - unity
      284053, // Thor: Ragnarok (2017) - fun superhero
      118340, // Guardians of the Galaxy (2014) - space fun
    ],
  };

  // Use intensity-based fallback
  const intensityCollection =
    defaultCollections[`${intensity}_intensity`] ||
    defaultCollections.medium_intensity;
  const randomIndex = Math.floor(Math.random() * intensityCollection.length);

  console.log(`Using ${intensity} intensity fallback for mood: "${mood}"`);
  return intensityCollection[randomIndex];
};

export const testGemini = async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_URL = process.env.GEMINI_API_URL;

    console.log("Gemini Environment check:", {
      GEMINI_API_KEY: GEMINI_API_KEY ? "Set" : "Missing",
      GEMINI_API_URL: GEMINI_API_URL ? "Set" : "Missing",
    });

    if (!GEMINI_API_KEY || !GEMINI_API_URL) {
      return res.status(500).json({
        success: false,
        message: "Missing Gemini configuration",
        error: "GEMINI_API_KEY or GEMINI_API_URL not found",
        env_check: {
          GEMINI_API_KEY: !!GEMINI_API_KEY,
          GEMINI_API_URL: !!GEMINI_API_URL,
        },
      });
    }

    // Get test prompt from query params or use default
    const {
      prompt = "Hello! Please respond with a simple greeting to test the API connection.",
    } = req.query;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini API responded with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();

    // Extract the generated text from Gemini's response
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    return res.json({
      success: true,
      prompt: prompt,
      response: generatedText,
      full_response: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error testing Gemini API:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to test Gemini API",
      error: error.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_URL = process.env.GEMINI_API_URL;

    if (!GEMINI_API_KEY || !GEMINI_API_URL) {
      return res.status(500).json({
        success: false,
        message: "Missing Gemini configuration",
      });
    }

    const { prompt, maxTokens = 1000 } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required in request body",
      });
    }

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.7,
      },
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini API responded with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    return res.json({
      success: true,
      prompt: prompt,
      response: generatedText,
      usage: data.usageMetadata || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate content",
      error: error.message,
    });
  }
};

export const getMoodBasedRecommendation = async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_URL = process.env.GEMINI_API_URL;
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    // Check environment variables
    if (
      !GEMINI_API_KEY ||
      !GEMINI_API_URL ||
      !TMDB_BASE_URL ||
      !TMDB_ACCESS_TOKEN
    ) {
      return res.status(500).json({
        success: false,
        message: "Missing API configuration",
      });
    }

    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({
        success: false,
        message: "Mood description is required in request body",
      });
    }

    console.log(`Processing mood: "${mood}"`);

    // Step 1: Use Gemini to convert mood to search query
    const geminiPrompt = `You are a query generator for a movie recommender system. 
The user will give you a description of their mood. 
Your job is to translate that mood into a short, plain-text movie search query (2–5 words). 
Do not explain. Do not add extra words. 
Just return the search query string.

User mood: ${mood}`;

    const geminiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: geminiPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 50,
        temperature: 0.3,
      },
    };

    const geminiResponse = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiRequestBody),
      }
    );

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    let searchQuery =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "popular movies";

    // Clean up the search query (remove quotes, extra spaces, etc.)
    searchQuery = searchQuery.replace(/['"]/g, "").trim();

    console.log(`Generated search query: "${searchQuery}"`);

    // Step 2: Query TMDB with the search string
    const tmdbResponse = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(
        searchQuery
      )}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!tmdbResponse.ok) {
      throw new Error(`TMDB API error: ${tmdbResponse.status}`);
    }

    const tmdbData = await tmdbResponse.json();

    // Step 3: Pick the best movie from results
    let selectedMovie = null;

    if (tmdbData.results && tmdbData.results.length > 0) {
      // Filter movies with proper release dates and decent ratings
      const validMovies = tmdbData.results.filter(
        (movie) =>
          movie.release_date &&
          movie.release_date.trim() !== "" &&
          movie.vote_average >= 3.0 &&
          movie.overview &&
          movie.overview.trim() !== ""
      );

      if (validMovies.length > 0) {
        // Pick the top result
        selectedMovie = validMovies[0];
      }
    } // Step 4: Enhanced fallback system
    if (!selectedMovie) {
      console.log(
        "No good search results found, using mood-based fallback system"
      );

      // Try to get a mood-specific fallback movie
      const fallbackMovieId = getMoodFallbackMovie(mood);

      if (fallbackMovieId) {
        try {
          const fallbackResponse = await fetch(
            `${TMDB_BASE_URL}/movie/${fallbackMovieId}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            selectedMovie = fallbackData;
            searchQuery = `mood-based fallback (${mood})`;
            console.log(
              `Using mood-based fallback movie: ${fallbackData.title}`
            );
          }
        } catch (fallbackError) {
          console.error(
            "Error fetching mood-based fallback movie:",
            fallbackError
          );
        }
      }

      // If mood-based fallback fails, try trending movies
      if (!selectedMovie) {
        console.log("Mood-based fallback failed, trying trending movies");

        const trendingResponse = await fetch(
          `${TMDB_BASE_URL}/trending/movie/day?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (trendingResponse.ok) {
          const trendingData = await trendingResponse.json();
          if (trendingData.results && trendingData.results.length > 0) {
            selectedMovie = trendingData.results[0];
            searchQuery = "trending movie (final fallback)";
            console.log(
              `Using trending fallback movie: ${selectedMovie.title}`
            );
          }
        }
      }
    }
    if (!selectedMovie) {
      throw new Error(
        "Could not find any suitable movie recommendation even with fallback systems"
      );
    }

    // Step 5: Format and return response
    return res.json({
      success: true,
      mood: mood,
      query: searchQuery,
      method: "search_based",
      fallback_used: searchQuery.includes("fallback"),
      gemini_response: {
        raw_text:
          geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response",
        full_response: geminiData,
      },
      movie: {
        id: selectedMovie.id,
        title: selectedMovie.title,
        overview: selectedMovie.overview,
        release_date: selectedMovie.release_date,
        vote_average: selectedMovie.vote_average,
        poster_path: selectedMovie.poster_path,
        backdrop_path: selectedMovie.backdrop_path,
        genres: selectedMovie.genres || [],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error getting mood-based recommendation:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get movie recommendation",
      error: error.message,
    });
  }
};

export const getMoodBasedRecommendationById = async (req, res) => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_URL = process.env.GEMINI_API_URL;
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    // Check environment variables
    if (
      !GEMINI_API_KEY ||
      !GEMINI_API_URL ||
      !TMDB_BASE_URL ||
      !TMDB_ACCESS_TOKEN
    ) {
      return res.status(500).json({
        success: false,
        message: "Missing API configuration",
      });
    }

    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({
        success: false,
        message: "Mood description is required in request body",
      });
    }

    console.log(`Processing mood for movie ID: "${mood}"`); // Step 1: Use Gemini to suggest a movie ID
    const geminiPrompt = `You are an expert film therapist and curator who understands how movies can heal, inspire, and match human emotions. A user will describe their current emotional state, and you must recommend the PERFECT movie that will either complement or help transform their mood.

CRITICAL INSTRUCTIONS:
- You have access to TMDB's complete database with accurate movie IDs
- Respond with ONLY the numeric TMDB movie ID (example: 19995, 550, 372058)
- Match the EXACT emotional need, not just genre
- Consider the therapeutic and emotional impact of the film

MOOD MATCHING GUIDELINES:
- HAPPY/ENERGETIC → Uplifting comedies, feel-good dramas, musicals (e.g., 284054 for Black Panther, 508442 for Soul)
- SAD/NEED TO CRY → Emotional dramas, tearjerkers, cathartic films (e.g., 37165 for The Pursuit of Happyness, 77338 for Inside Out)
- SCARED/THRILLS → Horror, suspense, psychological thrillers (e.g., 346364 for It, 419704 for Ad Astra)
- ROMANTIC → Love stories, romantic comedies, heartwarming romance (e.g., 313369 for La La Land, 568332 for Taylor Swift films are NOT romance)
- ADVENTURE → Action-adventure, exploration, epic journeys (e.g., 122, 120, 1726)
- CONTEMPLATIVE → Art house, philosophical dramas, slow cinema (e.g., 37724 for Synecdoche New York)
- REBELLIOUS → Anti-establishment films, punk cinema, revolution stories (e.g., 550 for Fight Club)

AVOID:
- Concert films for romance requests
- Children's content for adult emotional needs unless specifically therapeutic
- Mismatched genres (no comedies for deep sadness unless it's healing comedy)

User's current emotional state: ${mood}

Perfect TMDB ID:`;

    const geminiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: geminiPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 30,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
    };

    const geminiResponse = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiRequestBody),
      }
    );

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    let movieIdText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Extract only numbers from the response
    const movieId = movieIdText.match(/\d+/)?.[0];

    if (!movieId) {
      throw new Error("Gemini did not return a valid movie ID");
    }

    console.log(`Generated movie ID: ${movieId}`);

    // Step 2: Get movie details from TMDB using the ID
    const tmdbResponse = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!tmdbResponse.ok) {
      // Movie ID doesn't exist, fall back to search
      console.log(`Movie ID ${movieId} not found, falling back to search`);
      throw new Error(`Movie ID ${movieId} not found in TMDB`);
    }
    const movieData = await tmdbResponse.json();

    // Step 2.5: Validate genre match with mood
    const isValidMatch = validateMoodGenreMatch(mood, movieData.genres);

    if (!isValidMatch) {
      console.log(
        `Genre mismatch detected for movie: ${movieData.title}. Falling back to search method.`
      );
      throw new Error(
        `Genre mismatch: ${movieData.title} doesn't match mood "${mood}"`
      );
    } // Step 3: Format and return response
    return res.json({
      success: true,
      mood: mood,
      method: "direct_id",
      validation: {
        genre_match: true,
        movie_genres: movieData.genres?.map((g) => g.name) || [],
      },
      gemini_response: {
        raw_text: movieIdText,
        extracted_id: movieId,
        full_response: geminiData,
      },
      movie: {
        id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        release_date: movieData.release_date,
        vote_average: movieData.vote_average,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        genres: movieData.genres?.map((g) => g.name) || [],
        runtime: movieData.runtime,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error getting mood-based recommendation by ID:", error);

    // Enhanced fallback system - try mood-based fallback first before search method
    console.log(
      "ID method failed, trying mood-based fallback before search method..."
    );

    try {
      const fallbackMovieId = getMoodFallbackMovie(mood);

      if (fallbackMovieId) {
        const fallbackResponse = await fetch(
          `${TMDB_BASE_URL}/movie/${fallbackMovieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();

          // Validate genre match for fallback movie
          const isValidMatch = validateMoodGenreMatch(
            mood,
            fallbackData.genres
          );

          if (isValidMatch) {
            console.log(
              `Using mood-based fallback movie: ${fallbackData.title}`
            );

            return res.json({
              success: true,
              mood: mood,
              method: "mood_fallback",
              validation: {
                genre_match: true,
                movie_genres: fallbackData.genres?.map((g) => g.name) || [],
                fallback_reason:
                  "ID method failed, used curated mood collection",
              },
              movie: {
                id: fallbackData.id,
                title: fallbackData.title,
                overview: fallbackData.overview,
                release_date: fallbackData.release_date,
                vote_average: fallbackData.vote_average,
                poster_path: fallbackData.poster_path,
                backdrop_path: fallbackData.backdrop_path,
                genres: fallbackData.genres?.map((g) => g.name) || [],
                runtime: fallbackData.runtime,
              },
              timestamp: new Date().toISOString(),
            });
          } else {
            console.log(
              `Fallback movie genre mismatch, proceeding to search method`
            );
          }
        }
      }
    } catch (fallbackError) {
      console.error("Mood-based fallback also failed:", fallbackError);
    }

    // If mood-based fallback fails, fall back to search method
    console.log("Falling back to search method...");

    try {
      // Call the original search-based method as final fallback
      req.fallback = true;
      return await getMoodBasedRecommendation(req, res);
    } catch (searchFallbackError) {
      console.error("Search fallback method also failed:", searchFallbackError);
      return res.status(500).json({
        success: false,
        message:
          "Failed to get movie recommendation using ID method, mood fallback, and search method",
        error: error.message,
        mood_fallback_error:
          fallbackError?.message || "No mood fallback attempted",
        search_fallback_error: searchFallbackError.message,
      });
    }
  }
};
