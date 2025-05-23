import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { House } from '../../types';
import { cn } from '../../utils/cn';
import Badge from '../ui/Badge';

interface HouseCardProps {
  house: House;
  isFavorite?: boolean;
  onToggleFavorite?: (houseId: string) => void;
  className?: string;
}

const HouseCard: React.FC<HouseCardProps> = ({
  house,
  isFavorite = false,
  onToggleFavorite,
  className,
}) => {
  const { 
    id, 
    title, 
    location, 
    imageUrl, 
    price, 
    averageRating,
    bedrooms,
    bathrooms,
    sqft,
    style,
    featured
  } = house;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <motion.div
      className={cn(
        "card group",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        {/* Image */}
        <Link to={`/house/${id}`}>
          <div className="aspect-w-16 aspect-h-10 bg-secondary-200 dark:bg-secondary-700 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {featured && (
            <Badge variant="accent">Featured</Badge>
          )}
          <Badge variant="secondary">{style}</Badge>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite?.(id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-secondary-800 transition-all"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={cn(
              "w-5 h-5 transition-colors",
              isFavorite 
                ? "fill-error-500 text-error-500" 
                : "fill-transparent text-secondary-500 dark:text-secondary-400 group-hover:text-error-500"
            )} 
          />
        </button>

        {/* Rating */}
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary-900/80 dark:bg-secondary-900/90 backdrop-blur-sm text-white text-sm font-medium">
            <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
            <span>{averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <Link to={`/house/${id}`}>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
            <div className="flex items-center text-secondary-600 dark:text-secondary-400 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-secondary-900 dark:text-white">
            {formattedPrice}
          </p>
        </div>

        {/* Details */}
        <div className="flex justify-between text-sm text-secondary-600 dark:text-secondary-400 pt-2 border-t border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center gap-1">
            <span className="font-medium">{bedrooms}</span>
            <span>Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{bathrooms}</span>
            <span>Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{sqft.toLocaleString()}</span>
            <span>Sq Ft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HouseCard;