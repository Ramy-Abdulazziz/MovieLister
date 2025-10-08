import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages/Landing/Landing";
import Header from "./components/Header/Header";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
