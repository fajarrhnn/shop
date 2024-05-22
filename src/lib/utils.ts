import { type ClassValue, clsx } from "clsx"
import jwt from "jsonwebtoken"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const COOKIE_NAME = "token"
export const MAX_AGE = 60 * 60 * 24 * 10

export function decodeToken(token: string) {
  return jwt.decode(token);
}