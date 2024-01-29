import { Basket } from "./basket";
import { WishlistItem } from "./wishlist";

export interface User {
    email: string; 
    token: string;
    basket?: Basket;
    userName: string;
    roles?: string[];
    wishlistItems?: WishlistItem[];
}

export interface ResetPasswordDto {
    token: string;
    email: string;
    password: string;
    confirmPassword: string;
}