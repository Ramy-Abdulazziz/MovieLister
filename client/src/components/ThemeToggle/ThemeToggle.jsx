import { useTheme } from "../../hooks/useTheme";
import "/src/styles/themes.css";
import "./ThemeToggle.css";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="theme-toggle">
            <span className="label">
                <SunIcon />
            </span>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                />
                <span className="slider"></span>
            </label>
            <span className="label">
                <MoonIcon />
            </span>
        </div>
    );
};

export default ThemeToggle;
