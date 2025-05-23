import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface HouseGalleryProps {
  images: string[];
  mainImage: string;
  className?: string;
}

const HouseGallery: React.FC<HouseGalleryProps> = ({
  images,
  mainImage,
  className,
}) => {
  const allImages = [mainImage, ...images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="relative rounded-xl overflow-hidden bg-secondary-200 dark:bg-secondary-800">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={allImages[currentIndex]}
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-secondary-800 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-secondary-700 dark:text-secondary-300" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-secondary-800 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-secondary-700 dark:text-secondary-300" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-secondary-800 transition-colors"
          aria-label="Toggle fullscreen"
        >
          <Maximize2 className="w-5 h-5 text-secondary-700 dark:text-secondary-300" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-secondary-900/80 dark:bg-secondary-900/90 backdrop-blur-sm text-white text-sm font-medium">
          {currentIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all",
              index === currentIndex ? "ring-2 ring-primary-500" : "opacity-70 hover:opacity-100"
            )}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={toggleFullscreen}
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="relative max-w-6xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={allImages[currentIndex]}
                alt="Property fullscreen view"
                className="max-w-full max-h-[80vh] object-contain"
              />

              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HouseGallery;