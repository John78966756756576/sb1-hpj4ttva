import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { House } from '../../types';
import HouseCard from './HouseCard';
import { cn } from '../../utils/cn';

interface FeaturedHousesProps {
  houses: House[];
  title?: string;
  className?: string;
}

const FeaturedHouses: React.FC<FeaturedHousesProps> = ({
  houses,
  title = 'Featured Houses',
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    
    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, []);

  const maxIndex = Math.max(0, houses.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className={cn("", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white">{title}</h2>
        
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={cn(
              "p-2 rounded-full transition-colors",
              canGoPrev
                ? "bg-white dark:bg-secondary-800 hover:bg-secondary-100 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 shadow-sm"
                : "bg-secondary-100 dark:bg-secondary-800 text-secondary-400 dark:text-secondary-600 cursor-not-allowed"
            )}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={cn(
              "p-2 rounded-full transition-colors",
              canGoNext
                ? "bg-white dark:bg-secondary-800 hover:bg-secondary-100 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 shadow-sm"
                : "bg-secondary-100 dark:bg-secondary-800 text-secondary-400 dark:text-secondary-600 cursor-not-allowed"
            )}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex gap-4 transition-transform duration-500 ease-out"
          initial={false}
          animate={{ x: `calc(-${currentIndex * 100}% / ${visibleCount})` }}
        >
          {houses.map((house) => (
            <div 
              key={house.id}
              className={cn(
                "relative",
                visibleCount === 1 ? "w-full" : 
                visibleCount === 2 ? "w-1/2" : 
                "w-1/3"
              )}
            >
              <HouseCard house={house} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedHouses;