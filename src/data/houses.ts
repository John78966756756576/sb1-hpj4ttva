import { House } from '../types';

export const houses: House[] = [
  {
    id: '1',
    title: 'Modern Glass Retreat',
    location: 'Los Angeles, CA',
    description: 'A stunning modern house with floor-to-ceiling windows and panoramic views.',
    price: 5250000,
    imageUrl: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
    galleryImages: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg'
    ],
    architect: 'John Smith',
    year: 2022,
    sqft: 4500,
    bedrooms: 4,
    bathrooms: 4,
    style: 'Modern',
    featured: true,
    ratings: {
      architecture: 5,
      interior: 4.5,
      landscape: 4,
      overall: 4.7
    },
    averageRating: 4.7,
    reviewCount: 3
  },
  {
    id: '2',
    title: 'Seaside Mediterranean Villa',
    location: 'Santa Barbara, CA',
    description: 'A beautiful Mediterranean-style villa with ocean views and a private courtyard.',
    price: 4800000,
    imageUrl: 'https://images.pexels.com/photos/7535671/pexels-photo-7535671.jpeg',
    galleryImages: [
      'https://images.pexels.com/photos/7535671/pexels-photo-7535671.jpeg',
      'https://images.pexels.com/photos/7534774/pexels-photo-7534774.jpeg',
      'https://images.pexels.com/photos/7534777/pexels-photo-7534777.jpeg'
    ],
    architect: 'Jane Doe',
    year: 2021,
    sqft: 5200,
    bedrooms: 5,
    bathrooms: 5,
    style: 'Mediterranean',
    featured: true,
    ratings: {
      architecture: 4.8,
      interior: 4.6,
      landscape: 4.7,
      overall: 4.7
    },
    averageRating: 4.7,
    reviewCount: 5
  },
  {
    id: '3',
    title: 'Contemporary Hillside Estate',
    location: 'Beverly Hills, CA',
    description: 'An architectural masterpiece featuring clean lines and luxurious finishes.',
    price: 8500000,
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    galleryImages: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/1396135/pexels-photo-1396135.jpeg'
    ],
    architect: 'Sarah Chen',
    year: 2023,
    sqft: 7200,
    bedrooms: 6,
    bathrooms: 7,
    style: 'Contemporary',
    featured: true,
    ratings: {
      architecture: 4.9,
      interior: 4.8,
      landscape: 4.7,
      overall: 4.8
    },
    averageRating: 4.8,
    reviewCount: 6
  },
  {
    id: '4',
    title: 'Minimalist Urban Oasis',
    location: 'San Francisco, CA',
    description: 'A sophisticated minimalist design that maximizes space and natural light.',
    price: 4200000,
    imageUrl: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
    galleryImages: [
      'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg',
      'https://images.pexels.com/photos/2062428/pexels-photo-2062428.jpeg'
    ],
    architect: 'Michael Wong',
    year: 2022,
    sqft: 3200,
    bedrooms: 3,
    bathrooms: 3.5,
    style: 'Minimalist',
    featured: false,
    ratings: {
      architecture: 4.6,
      interior: 4.7,
      landscape: 4.4,
      overall: 4.6
    },
    averageRating: 4.6,
    reviewCount: 4
  },
  {
    id: '5',
    title: 'Industrial Loft Conversion',
    location: 'Downtown LA',
    description: 'A converted warehouse featuring exposed brick and steel elements.',
    price: 3200000,
    imageUrl: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg',
    galleryImages: [
      'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg',
      'https://images.pexels.com/photos/2883048/pexels-photo-2883048.jpeg',
      'https://images.pexels.com/photos/2883047/pexels-photo-2883047.jpeg'
    ],
    architect: 'Tom Rodriguez',
    year: 2021,
    sqft: 2800,
    bedrooms: 2,
    bathrooms: 2,
    style: 'Industrial',
    featured: false,
    ratings: {
      architecture: 4.5,
      interior: 4.6,
      landscape: 4.3,
      overall: 4.5
    },
    averageRating: 4.5,
    reviewCount: 7
  },
  {
    id: '6',
    title: 'Coastal Modern Retreat',
    location: 'Malibu, CA',
    description: 'A stunning beachfront property with seamless indoor-outdoor living.',
    price: 7500000,
    imageUrl: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg',
    galleryImages: [
      'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg',
      'https://images.pexels.com/photos/1268870/pexels-photo-1268870.jpeg',
      'https://images.pexels.com/photos/1268869/pexels-photo-1268869.jpeg'
    ],
    architect: 'Emma Davis',
    year: 2023,
    sqft: 4800,
    bedrooms: 4,
    bathrooms: 4.5,
    style: 'Coastal',
    featured: true,
    ratings: {
      architecture: 4.9,
      interior: 4.8,
      landscape: 4.9,
      overall: 4.9
    },
    averageRating: 4.9,
    reviewCount: 8
  }
];

export function getFeaturedHouses(): House[] {
  return houses.filter(house => house.featured);
}