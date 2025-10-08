import { render, screen, waitFor } from "@testing-library/react";
import { useParams } from "react-router";
import MovieDetail from "../MovieDetail";

vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useParams: vi.fn(),
    };
});

vi.mock("../../../components/MovieDetails/MovieDetails", () => ({
    default: ({ movie }) => (
        <div data-testid="movie-details">{movie.title}</div>
    ),
}));

vi.mock(
    "../../../components/MovieDetailsSkeleton/MovieDetailsSkeleton",
    () => ({
        default: () => <div data-testid="movie-details-skeleton"></div>,
    })
);

global.fetch = vi.fn();

describe("MovieDetail Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const createFetchResponse = (data, ok = true) => {
        return Promise.resolve({
            ok,
            json: () => Promise.resolve(data),
        });
    };

    it("should display the skeleton while loading", () => {
        useParams.mockReturnValue({ movieId: "123" });
        fetch.mockResolvedValue(createFetchResponse({})); // Mock a pending request

        render(<MovieDetail />);
        expect(
            screen.getByTestId("movie-details-skeleton")
        ).toBeInTheDocument();
    });

    it("should fetch and display movie details on successful load", async () => {
        const mockMovie = { id: 123, title: "The Matrix" };
        useParams.mockReturnValue({ movieId: "123" });
        fetch.mockResolvedValue(createFetchResponse(mockMovie));

        render(<MovieDetail />);
        await waitFor(() => {
            expect(screen.getByTestId("movie-details")).toBeInTheDocument();
            expect(screen.getByText("The Matrix")).toBeInTheDocument();
        });

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining("/movie/123")
        );
    });

    it("should display an error message if the fetch fails", async () => {
        useParams.mockReturnValue({ movieId: "123" });
        fetch.mockRejectedValue(new Error("Network Failure"));

        render(<MovieDetail />);
        await waitFor(() => {
            const errorMessage =
                "Could not find movie details. Please try again later.";
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it("should display an error for a non-ok HTTP response", async () => {
        useParams.mockReturnValue({ movieId: "404" });
        fetch.mockResolvedValue(createFetchResponse({}, false));

        render(<MovieDetail />);
        await waitFor(() => {
            const errorMessage =
                "Could not find movie details. Please try again later.";
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
