import { render, screen } from "@testing-library/react";
import MovieDetailsSkeleton from "../MovieDetailsSkeleton";

describe("MovieDetailsSkeleton", () => {
    it("should render the skeleton structure correctly", () => {
        const { container } = render(<MovieDetailsSkeleton />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
