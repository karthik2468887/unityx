import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ConceptCard.css';

const ConceptCard = ({ concept, onClick }) => {
    const navigate = useNavigate();

    // Simulate some missing data for the UI deterministically based on concept ID
    const { rating, reviews, duration, thumbnail } = React.useMemo(() => {
        // Simple hash function to generate consistent pseudo-random numbers
        const hash = (concept.id || '').toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const rand = (hash % 100) / 100; // Normalized 0-1

        return {
            rating: (rand * (5 - 4.2) + 4.2).toFixed(1),
            reviews: Math.floor(rand * 5000) + 100,
            duration: "5-10 min",
            thumbnail: `https://picsum.photos/seed/${concept.id}/400/225`
        };
    }, [concept.id]);

    return (
        <motion.div
            className="concept-card-unity"
            whileHover={{ y: -5 }}
            onClick={onClick}
        >
            <div className="card-image-box">
                <img src={thumbnail} alt={concept.concept} />
                <div className="card-overlay">
                    <div className="play-icon-mini">▶</div>
                </div>
                {/* Badge positioned on image ONLY - never overlaps title */}
                {rating > 4.7 && <div className="badge-unity bestseller">Bestseller</div>}
            </div>

            <div className="card-content-unity">
                <h3 className="card-title-unity">{concept.concept}</h3>
                <p className="card-mentor-unity">{concept.mentorName || 'Top Mentor'}</p>

                <div className="card-rating-unity">
                    <span className="rating-value">{rating}</span>
                    <div className="stars-mini">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < Math.floor(rating) ? "#b4690e" : "none"} color="#b4690e" strokeWidth={3} />
                        ))}
                    </div>
                    <span className="review-count">({reviews.toLocaleString()})</span>
                </div>

                <div className="card-meta-unity">
                    <span className="duration"><Clock size={12} /> {duration}</span>
                </div>

                <div className="card-price-unity">
                    <span className="price-tag-unity">₹{concept.price}</span>
                </div>

                {/* Badge moved to image-box above */}
            </div>
        </motion.div>
    );
};

export default ConceptCard;
