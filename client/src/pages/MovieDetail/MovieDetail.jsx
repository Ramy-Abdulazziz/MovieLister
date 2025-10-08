import { useState, useEffect } from "react";
import { useParams } from "react-router";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import MovieDetailsSkeleton from "../../components/MovieDetailsSkeleton/MovieDetailsSkeleton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            console.log(movieId);
            try {
                const response = await fetch(
                    `${API_BASE_URL}/movie/${movieId}`
                );
                if (!response.ok) {
                    throw new Error(
                        "Could not find movie details. Please try again later."
                    );
                }
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.log(err);
                setError(
                    "Could not find movie details. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
        window.scrollTo(0, 0);
    }, [movieId]);

    if (isLoading) {
        return <MovieDetailsSkeleton />;
    }

    if (error) {
        return <div className="details-error">{error}</div>;
    }

    if (!movie) {
        return <div>Movie not found.</div>;
    }

    return <MovieDetails movie={movie} />;
};

export default MovieDetail;
