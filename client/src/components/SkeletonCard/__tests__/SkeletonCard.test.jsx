import { render } from "@testing-library/react";
import SkeletonCard from "../SkeletonCard";

describe("SkeletonCard", () => {
    it("should render the skeleton structure correctly and match the snapshot", () => {
        const { container } = render(<SkeletonCard />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("should contain elements for the image and text placeholders", () => {
        const { container } = render(<SkeletonCard />);
        const imagePlaceholder = container.querySelector(".skeleton-image");
        const textPlaceholder = container.querySelector(".skeleton-text");

        expect(imagePlaceholder).toBeInTheDocument();
        expect(textPlaceholder).toBeInTheDocument();
    });
});
