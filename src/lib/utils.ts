import { type ClassValue, clsx } from "clsx"
import jwt from "jsonwebtoken"
import { twMerge } from "tailwind-merge"
import { CartsTypes } from "./definition"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const COOKIE_NAME = "token"
export const MAX_AGE = 60 * 60 * 24 * 10

export function decodeToken(token: string) {
  return jwt.decode(token);
}

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
};

export const subtotalPrice = (products: CartsTypes[]) => {
  let total = 0;
  products.forEach(product => {
    total += product.price * product.quantity;
  });
  return total;
}

export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"