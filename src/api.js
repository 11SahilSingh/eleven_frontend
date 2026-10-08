import axios from "axios";
import { placeholderImage } from "./utils/placeholder";

// Set VITE_API_URL in a .env file to point at a different backend.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

// Handles responses that return an array directly or wrap it (data.products / data.data).
const extractList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.data)) return data.data;
  if (data && typeof data === "object") return [data];
  return [];
};

// Maps common Spring Boot / database property names to the shape the UI uses.
export function normalizeProduct(p, index) {
  const name = p.productTitle || p.productName || p.name || "Untitled Product";
  const category =
    p.categoryName ||
    p.productCategory ||
    p.category?.categoryName ||
    (typeof p.category === "string" ? p.category : "") ||
    "";

  return {
    id: p.productPkId ?? p.id ?? `backend-${index}`,
    name,
    price: Number(p.productPrice ?? p.price ?? 0) || 0,
    image: p.imageUrl || p.productImage || p.image || placeholderImage(name),
    category,
    description: p.productDescription || p.description || "",
    brand: p.brand || p.productBrand || "",
    stock: p.stock ?? p.productStock ?? p.quantity,
    sizes: Array.isArray(p.sizes) ? p.sizes : p.size ? [p.size] : ["S", "M", "L", "XL"],
    color: p.color || "",
    rating: p.rating,
    reviews: p.reviews,
  };
}

export async function fetchProducts() {
  const { data } = await api.get("/indivisualController/getProduct", {
    params: { productPkId: "null" },
  });
  return extractList(data).map(normalizeProduct);
}

// TODO: add login, register, cart, order and admin endpoints here when the
// backend exposes them, and call them from src/context/StoreProvider.jsx.

export default api;
