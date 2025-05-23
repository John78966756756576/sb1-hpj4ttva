import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Ruler, 
  Bed, 
  Bath, 
  Tag, 
  ArrowLeft 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getHouseById } from '../data/houses';
import { House, Review } from '../types';
import Button from '../components/ui/Button';
import HouseGallery from '../components/house/HouseGallery';
import RatingBreakdown from '../components/ui/RatingBreakdown';
import ReviewSection from '../components/house/ReviewSection';
import FeaturedHouses from '../components/house/FeaturedHouses';
import { cn } from '../utils/cn';

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    houseId: '1',
    userId: 'user1',
    username: 'John Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    comment: 'The modern glass retreat is absolutely stunning. I love the way the design incorporates natural light and the surrounding landscape. The interior is spacious and well thought out.',
    date: '2023-04-15',
  },
  {
    id: '2',
    houseId: '1',
    userId: 'user2',
    username: 'Emma Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    comment: 'This house is a perfect example of modern architecture done right. The balance between functional spaces and aesthetic appeal is masterful. Would love to live in a place like this someday.',
    date: '2023-03-22',
  },
  {
    id: '3',
    houseId: '1',
    userId: 'user3',
    username: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
    comment: 'Great design overall, but I think the landscape could use more variety in plant selection. The architecture is impressive and the interior layout makes great use of the space.',
    date: '2023-05-01',
  },
];

const HouseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [house, setHouse] = useState<House | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarHouses, setSimilarHouses] = useState<House[]>([]);

  useEffect(() => {
    if (id) {
      const fetchedHouse = getHouseById(id);
      setHouse(fetchedHouse || null);
      
      // Filter reviews for this house
      setReviews(mockReviews.filter(review => review.houseId === id));
      
      // Get similar houses (in a real app, this would be more sophisticated)
      if (fetchedHouse) {
        const fetchedSimilarHouses = getHouseById('2') && getHouseById('3') && getHouseById('5') 
          ? [getHouseById('2')!, getHouseById('3')!, getHouseById('5')!]
          : [];
        setSimilarHouses(fetchedSimilarHouses);
      }
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString(),
    };
    
    setReviews(prev => [newReview, ...prev]);
  };

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-4">
            House not found
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            The house you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(house.price);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400 mb-6">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Explore
          </Link>
          <span>/</span>
          <span className="text-secondary-900 dark:text-white">{house.title}</span>
        </div>

        {/* House Title and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white">
              {house.title}
            </h1>
            <div className="flex items-center gap-1 text-secondary-600 dark:text-secondary-400 mt-2">
              <MapPin className="w-4 h-4" />
              <span>{house.location}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant={isFavorite ? "primary" : "outline"}
              icon={
                <Heart 
                  className={cn(
                    "w-5 h-5", 
                    isFavorite && "fill-white"
                  )} 
                />
              }
              onClick={toggleFavorite}
            >
              {isFavorite ? "Saved" : "Save"}
            </Button>
            
            <Button
              variant="outline"
              icon={<Share2 className="w-5 h-5" />}
            >
              Share
            </Button>
          </div>
        </div>

        {/* Gallery and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <HouseGallery 
              mainImage={house.imageUrl} 
              images={house.galleryImages} 
            />
          </div>
          
          <div className="space-y-6">
            {/* Price and Rating */}
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {formattedPrice}
                  </h2>
                </div>
                <div className="flex items-center bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                  <span className="text-lg font-semibold text-primary-700 dark:text-primary-300 mr-1">
                    {house.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    ({house.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <RatingBreakdown
                  categories={[
                    { name: 'Architecture', value: house.ratings.architecture },
                    { name: 'Interior', value: house.ratings.interior },
                    { name: 'Landscape', value: house.ratings.landscape },
                    { name: 'Overall', value: house.ratings.overall },
                  ]}
                />
              </div>
            </div>
            
            {/* Details */}
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Property Details
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">Year Built</div>
                    <div className="font-medium">{house.year}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300">
                  <Tag className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">Style</div>
                    <div className="font-medium">{house.style}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300">
                  <Ruler className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">Size</div>
                    <div className="font-medium">{house.sqft.toLocaleString()} sq ft</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300">
                  <Bed className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">Bedrooms</div>
                    <div className="font-medium">{house.bedrooms}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300">
                  <Bath className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">Bathrooms</div>
                    <div className="font-medium">{house.bathrooms}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Architect */}
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Architect
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center text-secondary-700 dark:text-secondary-300 font-semibold text-lg">
                  {house.architect.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-secondary-900 dark:text-white">
                    {house.architect}
                  </div>
                  <Link to={`/architect/${house.architect.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1 mb-12">
          <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
            Description
          </h3>
          <p className="text-secondary-700 dark:text-secondary-300 whitespace-pre-line">
            {house.description}
          </p>
        </div>

        {/* Reviews Section */}
        <ReviewSection 
          reviews={reviews} 
          houseId={house.id} 
          onAddReview={handleAddReview}
          className="mb-16"
        />

        {/* Similar Houses */}
        {similarHouses.length > 0 && (
          <div className="mb-12">
            <FeaturedHouses houses={similarHouses} title="Similar Designs You Might Like" />
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold">
              Love this design? Rate more houses like this!
            </h3>
            <p className="text-primary-100">
              Join our community of architecture enthusiasts and share your opinions on more stunning house designs.
            </p>
            <Button 
              variant="accent" 
              size="lg" 
              className="mt-2"
            >
              Explore More Designs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetailPage;