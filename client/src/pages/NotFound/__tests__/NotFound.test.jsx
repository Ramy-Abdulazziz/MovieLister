import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";
import NotFound from "../NotFound";

vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("NotFound Page", () => {
    const mockNavigate = vi.fn();
    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        mockNavigate.mockClear();
    });

    it("should render the not found message and title", () => {
        render(<NotFound />);
        expect(screen.getByText("Uh Oh!")).toBeInTheDocument();
        expect(screen.getByText(/Looks like you got lost/)).toBeInTheDocument();
    });

    it('should call navigate with "/home" when the return button is clicked', async () => {
        render(<NotFound />);

        const returnButton = screen.getByRole("button", {
            name: "Return Home",
        });
        await userEvent.click(returnButton);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
});
