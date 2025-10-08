import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages/Landing/Landing";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./components/Theme/ThemeProvider";

function App() {
    return (
        <>
            <BrowserRouter>
                <ThemeProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
