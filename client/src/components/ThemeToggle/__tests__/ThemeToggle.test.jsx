import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../../hooks/useTheme";

vi.mock("../../../hooks/useTheme");

describe("ThemeToggle", () => {
    const mockToggleTheme = vi.fn();
    beforeEach(() => {
        mockToggleTheme.mockClear();
    });

    it('should be checked when the theme is "dark"', () => {
        useTheme.mockReturnValue({
            theme: "dark",
            toggleTheme: mockToggleTheme,
        });

        render(<ThemeToggle />);

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    it('should not be checked when the theme is "light"', () => {
        useTheme.mockReturnValue({
            theme: "light",
            toggleTheme: mockToggleTheme,
        });

        render(<ThemeToggle />);

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    it("should call toggleTheme when the checkbox is clicked", async () => {
        useTheme.mockReturnValue({
            theme: "dark",
            toggleTheme: mockToggleTheme,
        });

        render(<ThemeToggle />);

        const checkbox = screen.getByRole("checkbox");

        await userEvent.click(checkbox);
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
});
