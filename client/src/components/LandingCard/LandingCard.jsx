import "./LandingCard.css";
import { ClapperboardIcon, MoveRightIcon } from "lucide-react";

const LandingCard = () => {

    return (
        <div className="welcome-card">
            <div className="card-icon">
                <ClapperboardIcon />
            </div>

            <h1 className="welcome-title">MovieLister</h1>
            <p className="welcome-subtitle">Your movies your way!</p>

            <button className="enter-btn">
                <span>Explore Movies</span>
                <MoveRightIcon />
            </button>

            <p className="powered-by">Powered by TMDB</p>
        </div>
    );
};

export default LandingCard;