import { useNavigate } from "react-router";
import "./NotFound.css";
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <div className="card">
                    <h1 className="card-title"> Uh Oh!</h1>
                    <p className="card-subtitle">
                        Looks like you got lost! Lets get you back on track
                    </p>

                    <button
                        className="return-button"
                        onClick={() => navigate("/home")}
                    >
                        <span>Return Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;