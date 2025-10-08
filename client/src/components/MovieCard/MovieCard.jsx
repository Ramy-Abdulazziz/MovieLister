import "./MovieCard.css";
import { useNavigate } from "react-router";

const MovieCard = ({ movieInfo }) => {
    const navigate = useNavigate();
    const rating = movieInfo.vote_average
        ? movieInfo.vote_average.toFixed(1)
        : "N/A";

    return (
        <div
            className="movie-card"
            onClick={() => navigate(`/movie/${movieInfo.id}`)}
        >
            <img
                src={
                    movieInfo.poster_url ||
                    "https://placehold.co/500x750/222/fff?text=No+Image"
                }
                alt={`Poster for ${movieInfo.title}`}
                className="movie-poster"
            />

            <div className="movie-info-overlay">
                <h3 className="movie-title">{movieInfo.title}</h3>
                <div className="movie-rating">
                    <span>⭐ {rating}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;