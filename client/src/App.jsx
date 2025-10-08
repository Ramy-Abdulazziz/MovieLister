import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages/Landing/Landing";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./components/Theme/ThemeProvider";
import { FavoritesProvider } from "./components/Favorites/FavoritesProvider";
import Home from "./pages/Home/Home";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <>
            <BrowserRouter>
                <ThemeProvider>
                    <FavoritesProvider>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/home" element={<Home />} />
                            <Route
                                path="/movie/:movieId"
                                element={<MovieDetail />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </FavoritesProvider>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
