import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  precision?: 'half' | 'full';
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  totalStars = 5,
  onChange,
  size = 'md',
  interactive = true,
  precision = 'half',
  className,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleStarClick = (selectedRating: number) => {
    if (!interactive) return;
    
    const newRating = precision === 'half' && hoverRating === selectedRating - 0.5 
      ? selectedRating - 0.5 
      : selectedRating;
    
    setRating(newRating);
    onChange?.(newRating);
  };

  const handleStarHover = (hoveredRating: number, e: React.MouseEvent) => {
    if (!interactive) return;
    
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    
    if (precision === 'half') {
      setHoverRating(percent <= 0.5 ? hoveredRating - 0.5 : hoveredRating);
    } else {
      setHoverRating(hoveredRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const renderStar = (starPosition: number) => {
    const isActiveRating = (hoverRating || rating) >= starPosition;
    const isHalfStar = 
      precision === 'half' && 
      Math.ceil(hoverRating || rating) === starPosition && 
      (hoverRating || rating) % 1 !== 0;

    return (
      <motion.span
        key={starPosition}
        className="relative inline-block cursor-pointer"
        onClick={() => handleStarClick(starPosition)}
        onMouseMove={(e) => handleStarHover(starPosition, e)}
        whileTap={{ scale: interactive ? 0.9 : 1 }}
      >
        <Star 
          className={cn(
            sizeClass[size], 
            'stroke-accent-400 transition-colors duration-200',
            isActiveRating ? 'fill-accent-400' : 'fill-transparent'
          )}
        />
        
        {isHalfStar && (
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star 
              className={cn(
                sizeClass[size],
                'stroke-accent-400 fill-accent-400'
              )}
            />
          </div>
        )}
      </motion.span>
    );
  };

  return (
    <div 
      className={cn("flex gap-1 items-center", className)}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(totalStars)].map((_, i) => renderStar(i + 1))}
    </div>
  );
};

export default StarRating;