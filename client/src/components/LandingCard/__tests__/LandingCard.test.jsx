import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";
import LandingCard from "../LandingCard";

vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("LandingCard", () => {
    const mockNavigate = vi.fn();
    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        mockNavigate.mockClear();
    });

    it("should render all static text content correctly", () => {
        render(<LandingCard />);

        expect(screen.getByText("MovieLister")).toBeInTheDocument();
        expect(screen.getByText("Your movies your way!")).toBeInTheDocument();
        expect(screen.getByText("Powered by TMDB")).toBeInTheDocument();
    });

    it('should call navigate with "/home" when the explore button is clicked', async () => {
        render(<LandingCard />);
        const exploreButton = screen.getByRole("button", {
            name: /explore movies/i,
        });
        await userEvent.click(exploreButton);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
});
