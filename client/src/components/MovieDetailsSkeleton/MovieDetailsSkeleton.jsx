import "./MovieDetailsSkeleton.css";

const MovieDetailsSkeleton = () => {
    return (
        <div className="skeleton-details-container">
            <div className="skeleton-backdrop"></div>
            <div className="skeleton-content">
                <div className="skeleton-actions">
                    <div className="skeleton-back-link"></div>
                </div>
                <div className="skeleton-header">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-tagline"></div>
                    <div className="skeleton-meta"></div>
                </div>
                <div className="skeleton-body">
                    <div className="skeleton-poster"></div>
                    <div className="skeleton-overview-section">
                        <div className="skeleton-overview-title"></div>
                        <div className="skeleton-overview-text"></div>
                        <div className="skeleton-overview-text"></div>
                        <div className="skeleton-overview-text short"></div>
                    </div>
                </div>
                <div className="skeleton-genres">
                    <div className="skeleton-genre-tag"></div>
                    <div className="skeleton-genre-tag"></div>
                    <div className="skeleton-genre-tag"></div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsSkeleton;
