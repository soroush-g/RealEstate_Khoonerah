export interface Property {
  id: number;
  name: string;
  description: string;
  pricePerMonth: number;
  securityDeposit: number;
  applicationFee: number;
  beds: number;
  baths: number;
  squareFeet: number;
  propertyType: 'Rooms' | 'Tinyhouse' | 'Apartment' | 'Villa' | 'Townhouse' | 'Cottage';
  isPetsAllowed?: boolean;
  isParkingIncluded?: boolean;
  amenities: string[];
  highlights: string[];
  photoUrls: string[];
  location: {
    id: number;
    address: string;
    province: string;
    city: string;
    district?: string;
    postalCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  managerCognitoId: string;
  postedDate: string;
}

export interface VirtualItem {
  index: number;
  start: number;
  size: number;
  lane: number;
} 