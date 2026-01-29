export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  imageUrl?: string;
  isPopular?: boolean;
  discount?: number; // percentage
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon?: string;
}
