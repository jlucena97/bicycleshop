// Interface representing the details of a product
export interface ProductDetail {
    id: number; // Unique identifier for the product
    product_name: string; // Name of the product
    product_type: string; // Type/category of the product
    quantity: number; // Quantity of the product available
    price: number; // Price of the product
    active: boolean; // Indicates if the product is active
    productOptions: ProductOption[]; // List of options available for the product
}

// Interface representing an option for a product
export interface ProductOption {
    id: number; // Unique identifier for the product option
    option_name: string; // Name of the product option
    productId: number; // Identifier of the product this option belongs to
    active: boolean; // Indicates if the product option is active
    disabled: boolean; // Indicates if the product option is disabled
}

// Interface representing a product
export interface Product {
    id: number; // Unique identifier for the product
    product_name: string; // Name of the product
    product_type: string; // Type/category of the product
    quantity: number; // Quantity of the product available
    price: number; // Price of the product
    active: boolean; // Indicates if the product is active
}

// Interface representing information about a product and its option
export interface ProductInfo {
    product: Product; // The product details
    productOption: ProductOption; // The product option details
}

// Interface representing the properties required to create a product
export interface CreateProductProps {
    productDetail?: ProductDetail; // Optional details of the product to be created
}