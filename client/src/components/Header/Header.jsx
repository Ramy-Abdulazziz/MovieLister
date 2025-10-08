import "/src/styles/themes.css";
import { ClapperboardIcon } from "lucide-react";
import "./Header.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <ClapperboardIcon />
                    <h1>MovieLister</h1>
                </div>
                <div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
