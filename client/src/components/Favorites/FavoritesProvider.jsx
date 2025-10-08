import { useState, useEffect, useCallback } from "react";
import { FavoritesContext } from "./FavoritesContext";

const FAVORITES_KEY = import.meta.env.VITE_FAVORITES_KEY;

export const FavoritesProvider = ({ children }) => {
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem(FAVORITES_KEY);
            if (storedFavorites) {
                setFavoriteIds(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error(
                "Failed to parse favorites from local storage",
                error
            );
            setFavoriteIds([]);
        }
    }, []);

    const addFavorite = useCallback((movieId) => {
        setFavoriteIds((prevIds) => {
            if (prevIds.includes(movieId)) {
                return prevIds;
            }
            const newIds = [...prevIds, movieId];
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(newIds));
            return newIds;
        });
    }, []);

    const removeFavorite = useCallback((movieId) => {
        setFavoriteIds((prevIds) => {
            const newIds = prevIds.filter((id) => id !== movieId);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(newIds));
            return newIds;
        });
    }, []);

    const value = {
        favoriteIds,
        addFavorite,
        removeFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};
