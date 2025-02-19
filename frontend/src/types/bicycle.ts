import { ProductDetail, ProductInfo } from './products';

// Type definitions for Bicycle Detail
export interface BicycleDetailProps {
  // Optional interface for bicycle details
  bicycleDetailInterface?: BicycleDetailInterface;
}

export interface BicycleDetailInterface {
  // Unique identifier for the bicycle
  id: number;
  // Name of the bicycle
  name: string;
  // Price of the bicycle
  price: number;
  // Indicates if the bicycle is sold
  sold: boolean;
  // Detailed information about the product
  productDetail: ProductDetail[];
}

export interface Bicycle {
  // Unique identifier for the bicycle
  id: number;
  // Name of the bicycle
  name: string;
  // Price of the bicycle
  price: number;
  // Indicates if the bicycle is sold
  sold: boolean;
  // Information about the product
  productInfo: ProductInfo[];
}

export interface BicyclePart {
  // Unique identifier for the bicycle part
  id: number;
  // Identifier for the bicycle this part belongs to
  bicycleId: number;
  // Identifier for the product this part is associated with
  productId: number;
  // Identifier for the product option
  productOptionId: number;
}

export interface UserCartData {
  // Unique identifier for the user
  user_id: number;
  // List of bikes in the user's cart
  bikes: { bike: Bicycle }[];
}

export interface ListBicyclePageState {
  // List of bicycles on the page
  bicycles: Bicycle[];
  // The currently selected bicycle, if any
  selectedBike: BicycleDetailInterface | null;
  // Indicates if the page is loading
  loading: boolean;
  // Error message, if any
  error: string | null;
}

// Props for the BicycleList component
export interface BicycleListProps {
  // List of bicycles to display
  bicycles: Bicycle[];
  // Function to handle the selection of a bicycle
  onSelectBike: (id: number) => void;
  // Indicates if the user is an admin
  isAdmin: boolean;
}
