const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.get("/trending/movie/:timeWindow", movieController.getTrendingMovies);
router.get("/movie/:id", movieController.getMovieDetails);

module.exports = router;