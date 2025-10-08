import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../ThemeProvider";
import { useTheme } from "../../../hooks/useTheme";
import { ThemeContext } from "../ThemeContext"; // Assuming this is where your context is

const TestThemeComponent = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <span data-testid="theme-display">{theme}</span>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

const renderWithProvider = () => {
    render(
        <ThemeProvider>
            <TestThemeComponent />
        </ThemeProvider>
    );
};

describe("ThemeProvider", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

    it('should default to "dark" theme when localStorage is empty', () => {
        renderWithProvider();

        expect(screen.getByTestId("theme-display").textContent).toBe("dark");
        expect(document.body.className).toBe("dark");
        expect(getItemSpy).toHaveBeenCalledWith("theme");
    });

    it("should initialize with the theme from localStorage if it exists", () => {
        localStorage.setItem("theme", "light");
        renderWithProvider();
        
        expect(screen.getByTestId("theme-display").textContent).toBe("light");
        expect(document.body.className).toBe("light");
    });

    it("should toggle the theme from dark to light on button click", async () => {
        renderWithProvider();
        expect(screen.getByTestId("theme-display").textContent).toBe("dark");
        const toggleButton = screen.getByRole("button", {
            name: "Toggle Theme",
        });

        await userEvent.click(toggleButton);

        expect(screen.getByTestId("theme-display").textContent).toBe("light");
        expect(document.body.className).toBe("light");
        expect(setItemSpy).toHaveBeenCalledWith("theme", "light");
    });

    it("should toggle the theme from light to dark on button click", async () => {
        localStorage.setItem("theme", "light");
        renderWithProvider();

        expect(screen.getByTestId("theme-display").textContent).toBe("light");
        const toggleButton = screen.getByRole("button", {
            name: "Toggle Theme",
        });
        await userEvent.click(toggleButton);

        expect(screen.getByTestId("theme-display").textContent).toBe("dark");
        expect(document.body.className).toBe("dark");
        expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");
    });
});
