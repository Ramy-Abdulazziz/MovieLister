require("dotenv").config();

const tmdbConfig = {
    apiKey: process.env.TMDB_API_KEY,
    baseUrl: "https://api.themoviedb.org/3",
    imageBaseUrl: "https://image.tmdb.org/t/p/",
    posterSize: "w500",
};

if (!tmdbConfig.apiKey) {
    throw new Error("TMDB_API_KEY is not defined in environment variables");
}

module.exports = tmdbConfig;
