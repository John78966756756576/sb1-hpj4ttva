export interface House {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
  galleryImages: string[];
  architect: string;
  year: number;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  style: string;
  featured: boolean;
  ratings: {
    architecture: number;
    interior: number;
    landscape: number;
    overall: number;
  };
  averageRating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  houseId: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  favorites: string[];
}

export type HouseStyle = 
  | 'Modern'
  | 'Contemporary'
  | 'Minimalist'
  | 'Traditional'
  | 'Mediterranean'
  | 'Craftsman'
  | 'Colonial'
  | 'Victorian'
  | 'Mid-Century'
  | 'Farmhouse'
  | 'Industrial'
  | 'Coastal';

export type SortOption = 
  | 'newest'
  | 'highest-rated'
  | 'price-high-to-low'
  | 'price-low-to-high';

export type FilterOptions = {
  priceRange: [number, number];
  styles: HouseStyle[];
  bedrooms: number | null;
  bathrooms: number | null;
  minRating: number;
  sortBy: SortOption;
};