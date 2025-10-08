const axios = require("axios");
const {
    fetchTrendingMovies,
    fetchMovieDetails,
} = require("../services/movie.service");

jest.mock("axios", () => {
    const mockAxios = jest.createMockFromModule("axios");
    mockAxios.create = jest.fn(() => mockAxios);

    return mockAxios;
});

describe("Movie Service", () => {
    beforeEach(() => {
        axios.get.mockClear();
    });

    it("Should fetch and transform trending movies", async () => {
        const mockApiResponse = {
            data: {
                results: [
                    {
                        id: 1,
                        title: "Test Movie",
                        poster_path: "/poster.jpg",
                        backdrop_path: "/backdrop.jpg",
                    },
                ],
            },
        };

        axios.get.mockResolvedValue(mockApiResponse);
        const movies = await fetchTrendingMovies("day");
        expect(axios.get).toHaveBeenCalledWith("/trending/movie/day");
        expect(movies.results).toHaveLength(1);
        expect(movies.results[0].title).toBe("Test Movie");
        expect(movies.results[0].poster_url).toContain("/poster.jpg");
        expect(movies.results[0].backdrop_url).toContain("/backdrop.jpg");
    });

    it("should fetch details for a single movie", async () => {
        const mockMovieDetailResponse = {
            data: { id: 123, title: "Another Test Movie" },
        };

        axios.get.mockResolvedValue(mockMovieDetailResponse);
        const movieDetails = await fetchMovieDetails(123);

        expect(axios.get).toHaveBeenCalledWith("/movie/123");
        expect(movieDetails.title).toBe("Another Test Movie");
    });
});
