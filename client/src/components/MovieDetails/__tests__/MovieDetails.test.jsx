import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MovieDetails from "../MovieDetails";

describe("MovieDetails", () => {
    const mockMovie = {
        id: 1,
        title: "Dune: Part Two",
        tagline: "Long live the fighters.",
        release_date: "2024-02-27",
        runtime: 166,
        vote_average: 8.3,
        overview:
            "Follow the mythic journey of Paul Atreides as he unites with Chani...",
        poster_url: "http://example.com/poster.jpg",
        backdrop_url: "http://example.com/backdrop.jpg",
        genres: [
            { id: 878, name: "Science Fiction" },
            { id: 12, name: "Adventure" },
        ],
    };

    const renderComponent = (movie) => {
        return render(
            <MemoryRouter>
                <MovieDetails movie={movie} />
            </MemoryRouter>
        );
    };

    it("should render all movie details correctly", () => {
        renderComponent(mockMovie);

        expect(screen.getByText("Dune: Part Two")).toBeInTheDocument();
        expect(screen.getByText("Long live the fighters.")).toBeInTheDocument();
        expect(screen.getByText("2024")).toBeInTheDocument();
        expect(screen.getByText("166 min")).toBeInTheDocument();
        expect(screen.getByText("⭐ 8.3")).toBeInTheDocument();
        expect(
            screen.getByText(/Follow the mythic journey/)
        ).toBeInTheDocument();

        expect(screen.getByText("Science Fiction")).toBeInTheDocument();
        expect(screen.getByText("Adventure")).toBeInTheDocument();

        const poster = screen.getByAltText("Dune: Part Two");
        const backdrop = screen.getByAltText("Dune: Part Two backdrop");
        expect(poster).toHaveAttribute("src", "http://example.com/poster.jpg");
        expect(backdrop).toHaveAttribute(
            "src",
            "http://example.com/backdrop.jpg"
        );
    });

    it('should render a "Back to Home" link that points to "/home"', () => {
        renderComponent(mockMovie);

        const backLink = screen.getByRole("link", { name: /back to home/i });
        expect(backLink).toBeInTheDocument();
        expect(backLink).toHaveAttribute("href", "/home");
    });

    it("should handle missing optional data gracefully", () => {
        const movieWithMissingData = {
            id: 2,
            title: "Another Movie",
        };

        renderComponent(movieWithMissingData);

        expect(screen.getByText("Another Movie")).toBeInTheDocument();
        expect(screen.queryByText(/min/)).not.toBeInTheDocument();
        expect(screen.queryByText("Adventure")).not.toBeInTheDocument();
    });
});
