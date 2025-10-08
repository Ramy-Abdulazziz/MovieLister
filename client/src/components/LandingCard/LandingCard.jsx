import "./LandingCard.css";
import { useNavigate } from "react-router";
import { ClapperboardIcon, MoveRightIcon } from "lucide-react";

const LandingCard = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-card">
            <div className="card-icon">
                <ClapperboardIcon />
            </div>

            <h1 className="welcome-title">MovieLister</h1>
            <p className="welcome-subtitle">Your movies your way!</p>

            <button className="enter-btn" onClick={() => navigate("/home")}>
                <span>Explore Movies</span>
                <MoveRightIcon />
            </button>

            <p className="powered-by">Powered by TMDB</p>
        </div>
    );
};

export default LandingCard;
