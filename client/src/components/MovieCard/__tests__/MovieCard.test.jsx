import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";
import MovieCard from "../MovieCard";

vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

vi.mock("../../FavoriteButton/FavoriteButton", () => ({
    default: () => <div data-testid="favorite-button-mock"></div>,
}));

describe("MovieCard", () => {
    const mockNavigate = vi.fn();
    const mockMovieInfo = {
        id: 123,
        title: "Inception",
        vote_average: 8.8,
        poster_url: "http://example.com/inception.jpg",
    };

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        mockNavigate.mockClear();
    });

    it("should render movie title, rating, and poster correctly", () => {
        render(<MovieCard movieInfo={mockMovieInfo} />);

        expect(screen.getByText("Inception")).toBeInTheDocument();
        expect(screen.getByText("⭐ 8.8")).toBeInTheDocument();

        const poster = screen.getByAltText("Poster for Inception");
        expect(poster).toBeInTheDocument();
        expect(poster).toHaveAttribute(
            "src",
            "http://example.com/inception.jpg"
        );
    });

    it("should render the mocked FavoriteButton component", () => {
        render(<MovieCard movieInfo={mockMovieInfo} />);
        expect(screen.getByTestId("favorite-button-mock")).toBeInTheDocument();
    });

    it("should call navigate with the correct path when the card is clicked", async () => {
        render(<MovieCard movieInfo={mockMovieInfo} />);
        const card = screen.getByText("Inception").closest(".movie-card");
        await userEvent.click(card);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/movie/123");
    });

    it('should display "N/A" for rating if vote_average is missing', () => {
        const movieWithoutRating = { ...mockMovieInfo, vote_average: null };
        render(<MovieCard movieInfo={movieWithoutRating} />);

        expect(screen.getByText("⭐ N/A")).toBeInTheDocument();
    });

    it("should display a placeholder image if poster_url is missing", () => {
        const movieWithoutPoster = { ...mockMovieInfo, poster_url: null };
        render(<MovieCard movieInfo={movieWithoutPoster} />);

        const poster = screen.getByAltText("Poster for Inception");
        expect(poster).toHaveAttribute(
            "src",
            "https://placehold.co/500x750/222/fff?text=No+Image"
        );
    });
});
