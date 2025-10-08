import { render, screen } from "@testing-library/react";
import Header from "../Header";

vi.mock("../../ThemeToggle/ThemeToggle", () => ({
    default: () => <div data-testid="theme-toggle-mock"></div>,
}));

describe("Header", () => {
    it("should render the logo and application title", () => {
        render(<Header />);
        expect(screen.getByText("MovieLister")).toBeInTheDocument();
    });

    it("should render the ThemeToggle component", () => {
        render(<Header />);
        expect(screen.getByTestId("theme-toggle-mock")).toBeInTheDocument();
    });
});
