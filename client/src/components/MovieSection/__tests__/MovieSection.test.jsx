import { render, screen } from "@testing-library/react";
import MovieSection from "../MovieSection";

vi.mock("../../MovieCard/MovieCard", () => ({
    default: ({ movieInfo }) => (
        <div data-testid="movie-card">{movieInfo.title}</div>
    ),
}));

vi.mock("../../SkeletonCard/SkeletonCard", () => ({
    default: () => <div data-testid="skeleton-card"></div>,
}));

describe("MovieSection", () => {
    const mockMovies = [
        { id: 1, title: "Test Movie 1" },
        { id: 2, title: "Test Movie 2" },
    ];

    it("should render the section title", () => {
        render(<MovieSection title="My Test Section" movies={[]} />);
        expect(
            screen.getByRole("heading", { name: "My Test Section" })
        ).toBeInTheDocument();
    });

    it("should display skeleton cards when isLoading is true", () => {
        render(
            <MovieSection title="Loading..." movies={[]} isLoading={true} />
        );

        const skeletonCards = screen.getAllByTestId("skeleton-card");
        expect(skeletonCards).toHaveLength(12);

        expect(screen.queryByTestId("movie-card")).not.toBeInTheDocument();
    });

    it("should display movie cards when data is loaded", () => {
        render(
            <MovieSection
                title="Trending"
                movies={mockMovies}
                isLoading={false}
            />
        );
        const movieCards = screen.getAllByTestId("movie-card");
        expect(movieCards).toHaveLength(2);

        expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
        expect(screen.getByText("Test Movie 2")).toBeInTheDocument();

        expect(screen.queryByTestId("skeleton-card")).not.toBeInTheDocument();
    });

    it("should display an error message when an error prop is provided", () => {
        const errorMessage = "Could not fetch data.";
        render(
            <MovieSection
                title="Error State"
                movies={[]}
                error={errorMessage}
            />
        );

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.queryByTestId("movie-card")).not.toBeInTheDocument();
        expect(screen.queryByTestId("skeleton-card")).not.toBeInTheDocument();
    });

    it("should render an empty grid when movies array is empty and not loading", () => {
        const { container } = render(
            <MovieSection title="Empty Section" movies={[]} isLoading={false} />
        );
        const grid = container.querySelector(".movie-grid");
        expect(grid).toBeInTheDocument();
        expect(grid.children.length).toBe(0);
    });
});
