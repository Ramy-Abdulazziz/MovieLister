const request = require("supertest");
const app = require("../server");
const movieService = require("../services/movie.service");

jest.mock("../services/movie.service");

describe("Movie API Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/movies/trending/movie/:timeWindow", () => {
        it("should return 200 OK with trending movies for a valid time window", async () => {
            const mockTrendingData = {
                page: 1,
                results: [{ id: 1, title: "Trending Movie" }],
            };
            movieService.fetchTrendingMovies.mockResolvedValue(
                mockTrendingData
            );

            const response = await request(app).get("/api/trending/movie/week");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockTrendingData);
            expect(movieService.fetchTrendingMovies).toHaveBeenCalledWith(
                "week"
            );
            expect(movieService.fetchTrendingMovies).toHaveBeenCalledTimes(1);
        });

        it("should return 400 Bad Request for an invalid time window", async () => {
            const response = await request(app).get(
                "/api/trending/movie/invalid"
            );

            expect(response.status).toBe(400);
            expect(response.body.error).toContain(
                "invalid time window - must be day or week"
            );
            expect(movieService.fetchTrendingMovies).not.toHaveBeenCalled();
        });

        it("should return 500 Internal Server Error if the service throws an error", async () => {
            movieService.fetchTrendingMovies.mockRejectedValue(
                new Error("Internal API Error")
            );

            const response = await request(app).get("/api/trending/movie/day");

            expect(response.status).toBe(500);
            expect(response.body.error).toBe("Internal API Error");
        });
    });

    describe("GET /api/movies/movie/:id", () => {
        it("should return 200 OK with movie details for a valid ID", async () => {
            const mockMovieData = {
                id: 123,
                title: "Specific Movie",
                overview: "An exciting film.",
            };
            movieService.fetchMovieDetails.mockResolvedValue(mockMovieData);

            const response = await request(app).get("/api/movie/123");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMovieData);
            expect(movieService.fetchMovieDetails).toHaveBeenCalledWith("123");
            expect(movieService.fetchMovieDetails).toHaveBeenCalledTimes(1);
        });

        it("should return 404 Not Found if the movie does not exist", async () => {
            movieService.fetchMovieDetails.mockResolvedValue(null);
            const response = await request(app).get("/api/movie/0");
            expect(response.status).toBe(404);
        });

        it("should return 500 Internal Server Error if the service throws an error", async () => {
            movieService.fetchMovieDetails.mockRejectedValue(
                new Error("Database connection failed")
            );

            const response = await request(app).get("/api/movie/123");

            expect(response.status).toBe(500);
            expect(response.body.error).toBe("Database connection failed");
        });
    });
});
