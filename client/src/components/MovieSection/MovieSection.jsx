import MovieCard from "../MovieCard/MovieCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import "./MovieSection.css";

const MovieSection = ({ title, movies, isLoading = false, error = null }) => {
    if (error) {
        return (
            <section className="movie-section">
                <h2 className="section-title">{title}</h2>
                <div className="error-container">
                    <div className="error-message">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <section className="movie-section">
            <h2 className="section-title">{title}</h2>
            <div className="movie-grid">
                {isLoading
                    ? Array.from({ length: 12 }).map((_, index) => (
                          <SkeletonCard key={index} />
                      ))
                    : movies.map((movie) => (
                          <MovieCard key={movie.id} movieInfo={movie} />
                      ))}
            </div>
        </section>
    );
};

export default MovieSection;
