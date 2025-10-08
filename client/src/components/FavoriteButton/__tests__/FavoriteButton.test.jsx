import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "../FavoriteButton";
import { useFavorites } from "../../../hooks/useFavorites";

vi.mock("../../../hooks/useFavorites");

describe("FavoriteButton", () => {
    const mockAddFavorite = vi.fn();
    const mockRemoveFavorite = vi.fn();
    const mockMovie = { id: 123, title: "Test Movie" };

    it("should render correctly and call addFavorite when not favorited", async () => {
        useFavorites.mockReturnValue({
            favoriteIds: [],
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
        });

        render(<FavoriteButton movie={mockMovie} />);

        // Assert: Check the initial state
        const button = screen.getByLabelText("Add to favorites");
        expect(button).toBeInTheDocument();
        expect(button).not.toHaveClass("favorited");

        // Act: Simulate a user clicking the button
        await userEvent.click(button);

        // Assert: Check that the correct function was called
        expect(mockAddFavorite).toHaveBeenCalledWith(123);
    });

    it("should render correctly and call removeFavorite when favorited", async () => {
        useFavorites.mockReturnValue({
            favoriteIds: [123], 
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
        });

        render(<FavoriteButton movie={mockMovie} />);

        const button = screen.getByLabelText("Remove from favorites");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("favorited");

        await userEvent.click(button);

        expect(mockRemoveFavorite).toHaveBeenCalledWith(123);
    });
});
