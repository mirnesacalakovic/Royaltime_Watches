export interface Product {
    id: number
    name: string
    description: string
    price: number
    pictureUrl: string
    brand: string
    type?: string
    gender?: string
    model?: string
    dialColor: string
    strapType: string
    quantityInStock?: number
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    brands: string[];
    genders: string[];
    models: string[];
    types: string[];
    pageNumber: number;
    pageSize: number;
  }