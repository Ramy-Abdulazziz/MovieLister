import { render, screen } from '@testing-library/react';
import Landing from '../Landing';

vi.mock('../../../components/LandingCard/LandingCard', () => ({
    default: () => <div data-testid="landing-card-mock"></div>,
}));

describe('Landing Page', () => {
    it('should render the LandingCard component', () => {
        render(<Landing />);
        expect(screen.getByTestId('landing-card-mock')).toBeInTheDocument();
    });

    it('should render the main container with the correct class name', () => {
        const { container } = render(<Landing />);
        const mainDiv = container.querySelector('.landing-page');
        expect(mainDiv).toBeInTheDocument();
    });
});
