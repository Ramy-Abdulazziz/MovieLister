import "/src/styles/themes.css";
import "./Home.css";
import { useEffect, useMemo, useState } from "react";
import MovieSection from "../../components/MovieSection/MovieSection";
import { useFavorites } from "../../hooks/useFavorites";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Home = () => {
    const [trending, setTrending] = useState([]);
    const [trendingError, setTrendingError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [faveError, setFaveError] = useState(null);
    const [loadingTrending, setLoadingTrending] = useState(true);
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    const { favoriteIds } = useFavorites();

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                setLoadingTrending(true);
                const response = await fetch(
                    `${API_BASE_URL}/trending/movie/day`
                );
                if (response.ok) {
                    const data = await response.json();
                    setTrending(data.results);
                } else {
                    setTrendingError("No movies here yet!");
                }
            } catch (err) {
                setTrendingError("Unable to fetch trending movies");
                console.error(err);
            } finally {
                setLoadingTrending(false);
            }
        };

        fetchTrending();
    }, []);

    const { knownFavorites, idsToFetch } = useMemo(() => {
        const known = trending.filter((movie) =>
            favoriteIds.includes(movie.id)
        );
        const knownIds = known.map((movie) => movie.id);
        const toFetch = favoriteIds.filter((id) => !knownIds.includes(id));
        return { knownFavorites: known, idsToFetch: toFetch };
    }, [trending, favoriteIds]);

    useEffect(() => {
        setFavorites(knownFavorites);

        if (idsToFetch.length === 0) {
            setLoadingFavorites(false);
            return;
        }

        const fetchMissingFavorites = async () => {
            setLoadingFavorites(true);
            try {
                const requests = idsToFetch.map((id) =>
                    fetch(`http://localhost:3001/api/movie/${id}`)
                );
                const responses = await Promise.all(requests);

                responses.forEach((res) => {
                    if (!res.ok)
                        setFaveError("Failed to get some fave movies!");
                });

                const newlyFetchedFavorites = await Promise.all(
                    responses.map((res) => res.json())
                );

                setFavorites((prevFavorites) => [
                    ...prevFavorites,
                    ...newlyFetchedFavorites,
                ]);
            } catch (err) {
                setFaveError("Unable to load favorites");
                console.error(err);
            } finally {
                setLoadingFavorites(false);
            }
        };

        if (!loadingTrending) {
            fetchMissingFavorites();
        }
    }, [idsToFetch, knownFavorites, loadingTrending]);

    return (
        <div>
            <MovieSection
                title={"Trending Today"}
                movies={trending}
                isLoading={loadingTrending}
                error={trendingError}
            />
            <MovieSection
                title={"Favorites"}
                movies={favorites}
                isLoading={loadingFavorites}
                error={faveError}
            />
        </div>
    );
};

export default Home;
