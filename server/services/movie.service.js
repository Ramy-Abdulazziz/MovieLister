const axios = require("axios");
const tmdbConfig = require("../config/tmdb");
const NodeCache = require("node-cache");

const movieCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
const tmdbApi = axios.create({
    baseURL: tmdbConfig.baseUrl,
    headers: {
        Authorization: `Bearer ${tmdbConfig.apiKey}`,
        "Content-Type": "application/json;charset=utf-8",
    },
});

const _addFullImageUrls = (movie) => {
    if (movie.poster_path) {
        movie.poster_url = `${tmdbConfig.imageBaseUrl}${tmdbConfig.posterSize}${movie.poster_path}`;
    }

    if (movie.backdrop_path) {
        movie.backdrop_url = `${tmdbConfig.imageBaseUrl}original${movie.backdrop_path}`;
    }
};

const fetchTrendingMovies = async (timeWindow = "week") => {
    const cacheKey = `trending_${timeWindow}`;
    const cachedData = movieCache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
    const moviesData = response.data;
    moviesData.results.forEach(_addFullImageUrls);
    movieCache.set(cacheKey, moviesData);

    return moviesData;
};

const fetchMovieDetails = async (id) => {
    const cacheKey = `movie_${id}`;
    const cachedData = movieCache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const response = await tmdbApi.get(`/movie/${id}`);
    const movieDetails = response.data;

    _addFullImageUrls(movieDetails);
    movieCache.set(cacheKey, movieDetails);
    return movieDetails;
};

module.exports = {
    fetchMovieDetails,
    fetchTrendingMovies,
};
