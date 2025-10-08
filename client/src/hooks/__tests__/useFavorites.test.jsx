import { renderHook } from "@testing-library/react";
import { FavoritesProvider } from "../../components/Favorites/FavoritesProvider";
import { useFavorites } from "../useFavorites";

describe("useFavorites hook", () => {
    it("should return the favorites context value when used within a FavoritesProvider", () => {
        const wrapper = ({ children }) => (
            <FavoritesProvider>{children}</FavoritesProvider>
        );
        const { result } = renderHook(() => useFavorites(), { wrapper });

        expect(Array.isArray(result.current.favoriteIds)).toBe(true);
        expect(typeof result.current.addFavorite).toBe("function");
        expect(typeof result.current.removeFavorite).toBe("function");
        expect(result.error).toBeUndefined();
    });
});
