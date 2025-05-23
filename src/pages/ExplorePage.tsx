import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search, ArrowUpDown, X } from 'lucide-react';
import { houses } from '../data/houses';
import { House, FilterOptions, HouseStyle, SortOption } from '../types';
import Button from '../components/ui/Button';
import HouseCard from '../components/house/HouseCard';
import SearchComponent from '../components/ui/Search';
import PriceRange from '../components/ui/PriceRange';
import { cn } from '../utils/cn';

const ExplorePage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>(houses);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    styles: [],
    bedrooms: null,
    bathrooms: null,
    minRating: 0,
    sortBy: 'newest',
  });

  const maxPrice = Math.max(...houses.map(house => house.price));
  const minPrice = Math.min(...houses.map(house => house.price));
  
  const houseStyles: HouseStyle[] = [
    'Modern', 'Contemporary', 'Minimalist', 'Traditional', 
    'Mediterranean', 'Craftsman', 'Colonial', 'Victorian',
    'Mid-Century', 'Farmhouse', 'Industrial', 'Coastal'
  ];

  const toggleFavorite = (houseId: string) => {
    setFavorites(prev => 
      prev.includes(houseId) 
        ? prev.filter(id => id !== houseId) 
        : [...prev, houseId]
    );
  };

  useEffect(() => {
    let result = [...houses];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(house => 
        house.title.toLowerCase().includes(query) ||
        house.location.toLowerCase().includes(query) ||
        house.description.toLowerCase().includes(query) ||
        house.style.toLowerCase().includes(query) ||
        house.architect.toLowerCase().includes(query)
      );
    }
    
    // Apply price range filter
    result = result.filter(
      house => house.price >= filterOptions.priceRange[0] && house.price <= filterOptions.priceRange[1]
    );
    
    // Apply style filter
    if (filterOptions.styles.length > 0) {
      result = result.filter(house => filterOptions.styles.includes(house.style as HouseStyle));
    }
    
    // Apply bedroom filter
    if (filterOptions.bedrooms !== null) {
      result = result.filter(house => house.bedrooms >= filterOptions.bedrooms!);
    }
    
    // Apply bathroom filter
    if (filterOptions.bathrooms !== null) {
      result = result.filter(house => house.bathrooms >= filterOptions.bathrooms!);
    }
    
    // Apply rating filter
    if (filterOptions.minRating > 0) {
      result = result.filter(house => house.averageRating >= filterOptions.minRating);
    }
    
    // Apply sorting
    switch (filterOptions.sortBy) {
      case 'newest':
        // Assuming newest would be by year in descending order
        result.sort((a, b) => b.year - a.year);
        break;
      case 'highest-rated':
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'price-high-to-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-to-high':
        result.sort((a, b) => a.price - b.price);
        break;
    }
    
    setFilteredHouses(result);
  }, [searchQuery, filterOptions, houses]);

  const handleStyleToggle = (style: HouseStyle) => {
    setFilterOptions(prev => {
      const newStyles = prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style];
      
      return {
        ...prev,
        styles: newStyles
      };
    });
  };

  const handleBedroomsChange = (bedrooms: number | null) => {
    setFilterOptions(prev => ({
      ...prev,
      bedrooms
    }));
  };

  const handleBathroomsChange = (bathrooms: number | null) => {
    setFilterOptions(prev => ({
      ...prev,
      bathrooms
    }));
  };

  const handleMinRatingChange = (rating: number) => {
    setFilterOptions(prev => ({
      ...prev,
      minRating: rating
    }));
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilterOptions(prev => ({
      ...prev,
      sortBy
    }));
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setFilterOptions(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const resetFilters = () => {
    setFilterOptions({
      priceRange: [minPrice, maxPrice],
      styles: [],
      bedrooms: null,
      bathrooms: null,
      minRating: 0,
      sortBy: 'newest',
    });
    setSearchQuery('');
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const activeFiltersCount = (
    (filterOptions.styles.length > 0 ? 1 : 0) +
    (filterOptions.bedrooms !== null ? 1 : 0) +
    (filterOptions.bathrooms !== null ? 1 : 0) +
    (filterOptions.minRating > 0 ? 1 : 0) +
    (filterOptions.priceRange[0] > minPrice || filterOptions.priceRange[1] < maxPrice ? 1 : 0)
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Page Title and Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
            Explore House Designs
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <SearchComponent 
              placeholder="Search by style, location, architect..." 
              onSearch={handleSearch}
              className="w-full md:w-2/3 lg:w-3/4"
            />
            
            <Button
              variant="secondary"
              icon={<SlidersHorizontal className="h-4 w-4" />}
              onClick={toggleFilters}
              className="md:ml-auto"
            >
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className={cn(
              "lg:block bg-white dark:bg-secondary-800 rounded-xl shadow-elevation-1 p-6 h-fit",
              isFilterOpen ? "block" : "hidden"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                Filters
              </h2>
              <button
                onClick={resetFilters}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Reset All
              </button>
            </div>
            
            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                Price Range
              </h3>
              <PriceRange 
                min={minPrice} 
                max={maxPrice}
                defaultValue={filterOptions.priceRange}
                onChange={handlePriceRangeChange}
              />
            </div>
            
            {/* House Style */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                House Style
              </h3>
              <div className="flex flex-wrap gap-2">
                {houseStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => handleStyleToggle(style)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      filterOptions.styles.includes(style)
                        ? "bg-primary-600 text-white"
                        : "bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600"
                    )}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bedrooms */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                Bedrooms
              </h3>
              <div className="flex flex-wrap gap-2">
                {[null, 1, 2, 3, 4, 5].map((count, index) => (
                  <button
                    key={index}
                    onClick={() => handleBedroomsChange(count)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      filterOptions.bedrooms === count
                        ? "bg-primary-600 text-white"
                        : "bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600"
                    )}
                  >
                    {count === null ? 'Any' : `${count}+`}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bathrooms */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                Bathrooms
              </h3>
              <div className="flex flex-wrap gap-2">
                {[null, 1, 2, 3, 4, 5].map((count, index) => (
                  <button
                    key={index}
                    onClick={() => handleBathroomsChange(count)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      filterOptions.bathrooms === count
                        ? "bg-primary-600 text-white"
                        : "bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600"
                    )}
                  >
                    {count === null ? 'Any' : `${count}+`}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Rating */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                Minimum Rating
              </h3>
              <div className="flex flex-wrap gap-2">
                {[0, 7, 8, 9].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleMinRatingChange(rating)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      filterOptions.minRating === rating
                        ? "bg-primary-600 text-white"
                        : "bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600"
                    )}
                  >
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Houses Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-secondary-700 dark:text-secondary-300">
                Showing <span className="font-semibold">{filteredHouses.length}</span> results
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-600 dark:text-secondary-400">Sort by:</span>
                <div className="relative">
                  <select
                    value={filterOptions.sortBy}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="pl-3 pr-10 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 focus:border-transparent appearance-none"
                  >
                    <option value="newest">Newest</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                    <option value="price-low-to-high">Price: Low to High</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500 dark:text-secondary-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filterOptions.styles.map(style => (
                  <div key={style} className="bg-secondary-100 dark:bg-secondary-800 rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="text-sm text-secondary-700 dark:text-secondary-300">{style}</span>
                    <button
                      onClick={() => handleStyleToggle(style)}
                      className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {filterOptions.bedrooms !== null && (
                  <div className="bg-secondary-100 dark:bg-secondary-800 rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="text-sm text-secondary-700 dark:text-secondary-300">{filterOptions.bedrooms}+ Bedrooms</span>
                    <button
                      onClick={() => handleBedroomsChange(null)}
                      className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {filterOptions.bathrooms !== null && (
                  <div className="bg-secondary-100 dark:bg-secondary-800 rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="text-sm text-secondary-700 dark:text-secondary-300">{filterOptions.bathrooms}+ Bathrooms</span>
                    <button
                      onClick={() => handleBathroomsChange(null)}
                      className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {filterOptions.minRating > 0 && (
                  <div className="bg-secondary-100 dark:bg-secondary-800 rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="text-sm text-secondary-700 dark:text-secondary-300">Rating {filterOptions.minRating}+</span>
                    <button
                      onClick={() => handleMinRatingChange(0)}
                      className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {(filterOptions.priceRange[0] > minPrice || filterOptions.priceRange[1] < maxPrice) && (
                  <div className="bg-secondary-100 dark:bg-secondary-800 rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="text-sm text-secondary-700 dark:text-secondary-300">
                      ${(filterOptions.priceRange[0] / 1000000).toFixed(1)}M - ${(filterOptions.priceRange[1] / 1000000).toFixed(1)}M
                    </span>
                    <button
                      onClick={() => handlePriceRangeChange([minPrice, maxPrice])}
                      className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {filteredHouses.length === 0 ? (
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-8 text-center shadow-elevation-1">
                <Search className="w-12 h-12 mx-auto text-secondary-400 dark:text-secondary-500 mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                  We couldn't find any houses matching your criteria. Try adjusting your filters.
                </p>
                <Button onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHouses.map((house) => (
                  <HouseCard 
                    key={house.id} 
                    house={house}
                    isFavorite={favorites.includes(house.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;