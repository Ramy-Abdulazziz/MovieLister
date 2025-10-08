import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoritesProvider } from "../FavoritesProvider";
import { useFavorites } from "../../../hooks/useFavorites";

const TestComponent = () => {
    const { favoriteIds, addFavorite, removeFavorite } = useFavorites();

    return (
        <div>
            <div data-testid="favorites-display">{favoriteIds.join(",")}</div>
            <button onClick={() => addFavorite(1)}>Add 1</button>
            <button onClick={() => addFavorite(2)}>Add 2</button>
            <button onClick={() => removeFavorite(1)}>Remove 1</button>
        </div>
    );
};

const renderWithProvider = () => {
    render(
        <FavoritesProvider>
            <TestComponent />
        </FavoritesProvider>
    );
};

describe("FavoritesProvider", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

    it("should initialize with an empty array if localStorage is empty", () => {
        renderWithProvider();
        expect(screen.getByTestId("favorites-display")).toBeEmptyDOMElement();
        expect(getItemSpy).toHaveBeenCalledWith(
            import.meta.env.VITE_FAVORITES_KEY
        );
    });

    it("should initialize with data from localStorage if it exists", () => {
        localStorage.setItem(
            import.meta.env.VITE_FAVORITES_KEY,
            JSON.stringify([1, 2, 3])
        );
        renderWithProvider();

        expect(screen.getByTestId("favorites-display").textContent).toBe(
            "1,2,3"
        );
    });

    it("should add a new favorite ID to state and localStorage", async () => {
        renderWithProvider();

        const addButton = screen.getByText("Add 1");
        await userEvent.click(addButton);

        expect(screen.getByTestId("favorites-display").textContent).toBe("1");
        expect(setItemSpy).toHaveBeenCalledWith(
            import.meta.env.VITE_FAVORITES_KEY,
            JSON.stringify([1])
        );
    });

    it("should remove a favorite ID from state and localStorage", async () => {
        localStorage.setItem(
            import.meta.env.VITE_FAVORITES_KEY,
            JSON.stringify([1, 2])
        );
        renderWithProvider();

        const removeButton = screen.getByText("Remove 1");
        await userEvent.click(removeButton);

        expect(screen.getByTestId("favorites-display").textContent).toBe("2");
        expect(setItemSpy).toHaveBeenCalledWith(
            import.meta.env.VITE_FAVORITES_KEY,
            JSON.stringify([2])
        );
    });

    it("should not add a duplicate favorite ID", async () => {
        renderWithProvider();

        const addButton = screen.getByText("Add 1");
        await userEvent.click(addButton);
        await userEvent.click(addButton);

        expect(screen.getByTestId("favorites-display").textContent).toBe("1");
        expect(setItemSpy).toHaveBeenCalledWith(
            import.meta.env.VITE_FAVORITES_KEY,
            JSON.stringify([1])
        );
        expect(setItemSpy).toHaveBeenCalledTimes(1);
    });
});
