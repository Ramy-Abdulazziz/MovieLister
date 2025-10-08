import { Heart } from "lucide-react";
import "./FavoriteButton.css";
import { useFavorites } from "../../hooks/useFavorites";

const FavoriteButton = ({ movie }) => {
    const { favoriteIds, addFavorite, removeFavorite } = useFavorites();

    const isFavorited = favoriteIds.includes(movie.id);

    const handleToggleFavorite = (e) => {
        e.stopPropagation();

        if (isFavorited) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie.id);
        }
    };

    return (
        <button
            className={`favorite-button ${isFavorited ? "favorited" : ""}`}
            onClick={handleToggleFavorite}
            aria-label={
                isFavorited ? "Remove from favorites" : "Add to favorites"
            }
        >
            <Heart size={24} />
        </button>
    );
};

export default FavoriteButton;
