import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Home, LayoutGrid, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { houses, getFeaturedHouses } from '../data/houses';
import Button from '../components/ui/Button';
import FeaturedHouses from '../components/house/FeaturedHouses';
import HouseCard from '../components/house/HouseCard';
import SearchComponent from '../components/ui/Search';
import { HouseStyle } from '../types';

const HomePage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const featuredHouses = getFeaturedHouses();
  const houseStyles: HouseStyle[] = ['Modern', 'Contemporary', 'Minimalist', 'Mediterranean', 'Industrial', 'Coastal'];
  
  const toggleFavorite = (houseId: string) => {
    setFavorites(prev => 
      prev.includes(houseId) 
        ? prev.filter(id => id !== houseId) 
        : [...prev, houseId]
    );
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[90vh] flex items-center"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-900/50"></div>
          <img 
            src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Modern house design" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div className="space-y-8" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Discover & Rate <br />
              <span className="text-primary-400">Exceptional</span> House Designs
            </h1>
            
            <p className="text-lg text-secondary-200 max-w-xl">
              Explore architectural masterpieces from around the world. 
              Rate designs, share your opinions, and connect with a community 
              that appreciates brilliant architecture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                icon={<Search className="h-5 w-5" />}
                className="sm:w-auto w-full"
              >
                Explore Designs
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white hover:bg-white/10 sm:w-auto w-full"
              >
                How It Works
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">4.9</span>
                <span className="text-secondary-300">Average Rating</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">500+</span>
                <span className="text-secondary-300">House Designs</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">15k+</span>
                <span className="text-secondary-300">Active Users</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-xl blur-xl"></div>
              <div className="relative glass rounded-xl p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-white">Rate This Design</h3>
                
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                  <img 
                    src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="House to rate" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-secondary-700 dark:text-secondary-300">Architecture</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className="w-5 h-5 fill-accent-400 text-accent-400" 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-secondary-700 dark:text-secondary-300">Interior</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((star) => (
                        <Star 
                          key={star}
                          className="w-5 h-5 fill-accent-400 text-accent-400" 
                        />
                      ))}
                      <Star className="w-5 h-5 text-accent-400" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-secondary-700 dark:text-secondary-300">Landscape</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className="w-5 h-5 fill-accent-400 text-accent-400" 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Submit Rating
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Search Section */}
      <section className="py-12 bg-white dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SearchComponent 
              placeholder="Search house designs, styles, or locations..." 
              suggestions={[
                'Modern houses in California',
                'Mediterranean villas',
                'Minimalist apartment designs',
                'Coastal homes',
                'Industrial lofts'
              ]}
              className="w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Houses */}
      <section className="py-16 bg-secondary-50 dark:bg-secondary-950">
        <div className="container-custom">
          <FeaturedHouses houses={featuredHouses} />
          
          <div className="mt-8 text-center">
            <Link to="/explore">
              <Button 
                variant="outline" 
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                View All House Designs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Browse By Style */}
      <section className="py-16 bg-white dark:bg-secondary-900">
        <div className="container-custom">
          <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-8">
            Browse by Style
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {houseStyles.map((style) => (
              <Link 
                key={style} 
                to={`/style/${style.toLowerCase()}`} 
                className="group relative rounded-xl overflow-hidden aspect-video"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent"></div>
                <img 
                  src={`https://images.pexels.com/photos/${
                    style === 'Modern' ? '1438832' : 
                    style === 'Contemporary' ? '1396122' : 
                    style === 'Minimalist' ? '2062431' : 
                    style === 'Mediterranean' ? '7535671' : 
                    style === 'Industrial' ? '2883049' : 
                    '1268871'
                  }/pexels-photo-${
                    style === 'Modern' ? '1438832' : 
                    style === 'Contemporary' ? '1396122' : 
                    style === 'Minimalist' ? '2062431' : 
                    style === 'Mediterranean' ? '7535671' : 
                    style === 'Industrial' ? '2883049' : 
                    '1268871'
                  }.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} 
                  alt={`${style} house style`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary-300 transition-colors">
                    {style}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-950 dark:to-primary-950">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Why Choose ArchRating
            </h2>
            <p className="text-secondary-700 dark:text-secondary-300">
              Discover what makes our platform the premier destination for house design enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Curated Designs
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Our team of architectural experts hand-picks the most innovative and aesthetically pleasing house designs from around the world.
              </p>
            </div>
            
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Detailed Ratings
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Rate designs across multiple categories including architecture, interior design, and landscape. Get a comprehensive view of each property.
              </p>
            </div>
            
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-elevation-1 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center mb-4">
                <LayoutGrid className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Personalized Experience
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Save your favorite designs, follow specific architects, and receive personalized recommendations based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Additions */}
      <section className="py-16 bg-white dark:bg-secondary-900">
        <div className="container-custom">
          <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-8">
            Recently Added
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.slice(0, 3).map((house) => (
              <HouseCard 
                key={house.id} 
                house={house}
                isFavorite={favorites.includes(house.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/explore">
              <Button 
                variant="outline" 
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                View More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Ready to Rate Amazing House Designs?
            </h2>
            <p className="text-secondary-300 text-lg">
              Join our community of architecture enthusiasts and start rating designs today.
            </p>
            <Button size="lg" className="mt-4">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;