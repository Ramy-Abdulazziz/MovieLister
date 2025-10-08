import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import "./MovieDetails.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MovieDetails = ({ movie }) => {
    return (
        <div className="movie-details-container">
            <div className="backdrop-container">
                <img
                    src={movie.backdrop_url}
                    alt={`${movie.title} backdrop`}
                    className="backdrop-image"
                />
                <div className="backdrop-overlay"></div>
            </div>

            <div className="details-content">
                <div className="actions-container">
                    <Link to="/home" className="back-link">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                </div>
                <div className="details-header">
                    <div className="title-container">
                        <h1>{movie.title}</h1>
                    </div>
                    <p className="tagline">{movie.tagline}</p>

                    <div className="details-meta">
                        <span>{movie.release_date?.substring(0, 4)}</span>
                        <span>•</span>
                        <span>{movie.runtime} min</span>
                        <span>•</span>
                        <span className="rating">
                            ⭐ {movie.vote_average?.toFixed(1)}
                        </span>
                    </div>
                </div>
                <div className="details-body">
                    <div className="details-poster-mobile">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>
                    <div className="overview-section">
                        <h2>Overview</h2>
                        <p className="overview">{movie.overview}</p>
                    </div>
                </div>
                <div className="genres">
                    {movie.genres?.map((genre) => (
                        <span key={genre.id} className="genre-tag">
                            {genre.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
