import { render, screen, waitFor } from "@testing-library/react";
import Home from "../Home";
import { useFavorites } from "../../../hooks/useFavorites";

vi.mock("../../../hooks/useFavorites");

vi.mock("../../../components/MovieSection/MovieSection", () => ({
    default: ({ title, movies, isLoading, error }) => (
        <div
            data-testid={`movie-section-${title
                .toLowerCase()
                .replace(" ", "-")}`}
        >
            <h2>{title}</h2>
            {isLoading && <span>Loading...</span>}
            {error && <span>Error: {error}</span>}
            {movies.map((m) => (
                <div key={m.id}>{m.title}</div>
            ))}
        </div>
    ),
}));

global.fetch = vi.fn();

describe("Home Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useFavorites.mockReturnValue({ favoriteIds: [] });
    });

    // Helper function to create mock fetch responses
    const createFetchResponse = (data, ok = true) => {
        return Promise.resolve({
            ok,
            json: () => Promise.resolve(data),
        });
    };

    it("should fetch and display trending movies successfully", async () => {
        const mockTrending = { results: [{ id: 1, title: "Trending Movie" }] };
        fetch.mockReturnValueOnce(createFetchResponse(mockTrending));

        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText("Trending Movie")).toBeInTheDocument();
        });

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining("/trending/movie/day")
        );
    });

    it("should display an error if fetching trending movies fails", async () => {
        fetch.mockRejectedValueOnce(new Error("Network error"));
        render(<Home />);
        await waitFor(() => {
            expect(
                screen.getByTestId("movie-section-trending-today")
            ).toHaveTextContent("Error: Unable to fetch trending movies");
        });
    });

    it("should display favorite movies successfully", async () => {
        const mockFavorite = { results: [{ id: 1, title: "Favorite Movie" }] };
        fetch.mockReturnValueOnce(createFetchResponse(mockFavorite));

        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText("Favorite Movie")).toBeInTheDocument();
        });
    });
});
