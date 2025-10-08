const movieService = require("../services/movie.service");

const getTrendingMovies = async (req, res, next) => {
    try {
        const { timeWindow } = req.params;
        if (timeWindow !== "day" && timeWindow !== "week") {
            return res.status(400).json({
                error: "invalid time window - must be day or week",
            });
        }
        const movies = await movieService.fetchTrendingMovies(timeWindow);
        res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
};

const getMovieDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movieDetails = await movieService.fetchMovieDetails(id);
        res.status(200).json(movieDetails);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTrendingMovies,
    getMovieDetails,
};
