import React, { useState } from 'react';
import { User, Star, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '../../types';
import Button from '../ui/Button';
import StarRating from '../ui/StarRating';
import { cn } from '../../utils/cn';

interface ReviewSectionProps {
  reviews: Review[];
  houseId: string;
  className?: string;
  onAddReview?: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  houseId,
  className,
  onAddReview,
}) => {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  const handleSubmitReview = () => {
    if (newRating === 0 || !newComment.trim()) return;

    onAddReview?.({
      houseId,
      userId: 'current-user-id', // In a real app, this would come from auth
      username: 'Current User', // In a real app, this would come from auth
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      rating: newRating,
      comment: newComment,
    });

    // Reset form
    setNewRating(0);
    setNewComment('');
    setIsWritingReview(false);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const averageRating = calculateAverageRating();

  const ratingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    
    reviews.forEach(review => {
      const index = Math.floor(review.rating) - 1;
      if (index >= 0 && index < 5) {
        distribution[index]++;
      }
    });
    
    return distribution.reverse(); // Reverse to show 5 stars first
  };

  const distribution = ratingDistribution();

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white">
          Reviews
        </h2>
        
        <Button 
          variant={isWritingReview ? "secondary" : "primary"}
          icon={isWritingReview ? undefined : <MessageSquare className="h-4 w-4" />}
          onClick={() => setIsWritingReview(!isWritingReview)}
        >
          {isWritingReview ? 'Cancel' : 'Write a Review'}
        </Button>
      </div>

      {/* Review Summary */}
      <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-bold text-secondary-900 dark:text-white mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating initialRating={averageRating} interactive={false} size="lg" />
            <p className="mt-2 text-secondary-600 dark:text-secondary-400">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => {
              const count = distribution[index];
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span>{star}</span>
                    <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                  </div>
                  <div className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm text-secondary-600 dark:text-secondary-400">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Write a Review Form */}
      <AnimatePresence>
        {isWritingReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1 space-y-4">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                Write a Review
              </h3>
              
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Your Rating
                </label>
                <StarRating
                  initialRating={newRating}
                  onChange={setNewRating}
                  size="lg"
                  totalStars={5}
                />
              </div>
              
              <div className="flex flex-col space-y-1">
                <label htmlFor="review-comment" className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  Your Review
                </label>
                <textarea
                  id="review-comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience with this house design..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitReview}
                  disabled={newRating === 0 || !newComment.trim()}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sort Controls */}
      {reviews.length > 0 && (
        <div className="flex justify-end">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button
              onClick={() => setSortBy('newest')}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                sortBy === 'newest'
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
              )}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy('highest')}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                sortBy === 'highest'
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
              )}
            >
              Highest Rating
            </button>
            <button
              onClick={() => setSortBy('lowest')}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                sortBy === 'lowest'
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
              )}
            >
              Lowest Rating
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length === 0 ? (
          <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 text-center shadow-elevation-1">
            <p className="text-secondary-600 dark:text-secondary-400">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1"
            >
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-secondary-500 dark:text-secondary-400" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-secondary-900 dark:text-white">
                      {review.username}
                    </div>
                    <div className="text-xs text-secondary-500 dark:text-secondary-400">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-secondary-100 dark:bg-secondary-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="font-medium">{review.rating.toFixed(1)}</span>
                    <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                  </div>
                </div>
              </div>
              <p className="text-secondary-700 dark:text-secondary-300">
                {review.comment}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;