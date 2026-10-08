import { placeholderImage } from "../utils/placeholder";

// Sample catalog used until the backend is reachable.
const CLOTHING_SIZES = ["S", "M", "L", "XL"];
const WAIST_SIZES = ["28", "30", "32", "34"];
const KIDS_SIZES = ["4-5Y", "6-7Y", "8-9Y"];
const SHOE_SIZES = ["7", "8", "9", "10"];

const product = (id, name, category, price, extra = {}) => ({
  id,
  name,
  category,
  price,
  brand: "ELEVEN",
  stock: 40,
  sizes: CLOTHING_SIZES,
  color: "",
  rating: 4.4,
  reviews: 48,
  description: "",
  image: placeholderImage(name, 600, 700, category),
  ...extra,
});

export const sampleProducts = [
  product("p1", "Black Oversized T-Shirt", "Men", 799, {
    color: "Black",
    rating: 4.6,
    reviews: 120,
    description: "Heavyweight 240 GSM cotton tee with a relaxed, dropped-shoulder fit.",
  }),
  product("p2", "Blue Denim Jacket", "Men", 1999, {
    color: "Blue",
    stock: 20,
    description: "Classic trucker-style denim jacket with button flap pockets.",
  }),
  product("p3", "Black Hoodie", "Men", 999, {
    color: "Black",
    rating: 4.7,
    reviews: 96,
    description: "Premium quality black hoodie made from 100% cotton. Comfortable, stylish and perfect for everyday wear.",
  }),
  product("p4", "White Basic T-Shirt", "Women", 599, {
    color: "White",
    description: "Soft, breathable everyday tee with a regular fit.",
  }),
  product("p5", "Floral Summer Dress", "Women", 1499, {
    color: "Multicolor",
    stock: 15,
    description: "Lightweight midi dress with an all-over floral print.",
  }),
  product("p6", "Kids Graphic Tee", "Kids", 449, {
    sizes: KIDS_SIZES,
    color: "Yellow",
    description: "Fun printed cotton tee for everyday play.",
  }),
  product("p7", "Kids Joggers", "Kids", 699, {
    sizes: KIDS_SIZES,
    color: "Grey",
    description: "Stretchy fleece joggers with an elastic waist.",
  }),
  product("p8", "Running Sneakers", "Sports", 2499, {
    sizes: SHOE_SIZES,
    color: "White",
    rating: 4.5,
    reviews: 210,
    description: "Lightweight cushioned sneakers built for daily runs.",
  }),
  product("p9", "Dry-Fit Training Tee", "Sports", 899, {
    color: "Navy",
    description: "Quick-dry, moisture-wicking tee for workouts.",
  }),
  product("p10", "Slim Fit Blue Jeans", "Jeans", 1499, {
    sizes: WAIST_SIZES,
    color: "Blue",
    rating: 4.3,
    reviews: 88,
    description: "Slim fit stretch denim with a mid-rise waist.",
  }),
  product("p11", "Relaxed Black Jeans", "Jeans", 1699, {
    sizes: WAIST_SIZES,
    color: "Black",
    description: "Relaxed straight-leg jeans in washed black denim.",
  }),
  product("p12", "Oxford Cotton Shirt", "Shirt", 1299, {
    color: "Light Blue",
    description: "Button-down Oxford shirt that works for office and weekends.",
  }),
  product("p13", "Linen Casual Shirt", "Shirt", 1399, {
    color: "Beige",
    description: "Breathable linen-blend shirt with a relaxed fit.",
  }),
  product("p14", "Beige Chino Pants", "Pant", 1199, {
    sizes: WAIST_SIZES,
    color: "Beige",
    description: "Tapered cotton chinos with a touch of stretch.",
  }),
  product("p15", "Olive Cargo Pants", "Cargo", 1599, {
    sizes: WAIST_SIZES,
    color: "Olive",
    rating: 4.6,
    reviews: 74,
    description: "Utility cargo pants with six pockets and adjustable hems.",
  }),
  product("p16", "Black Utility Cargo Joggers", "Cargo", 1499, {
    color: "Black",
    description: "Cargo joggers with an elastic waist and cuffed ankles.",
  }),
];

const category = (id, name, description) => ({
  id,
  name,
  description,
  image: placeholderImage(name, 500, 500, name),
});

export const sampleCategories = [
  category("c1", "Men", "Tees, hoodies and jackets for men"),
  category("c2", "Women", "Dresses, tops and basics for women"),
  category("c3", "Kids", "Comfortable clothing for kids"),
  category("c4", "Sports", "Activewear and sneakers"),
  category("c5", "Jeans", "Slim, straight and relaxed denim"),
  category("c6", "Shirt", "Casual and formal shirts"),
  category("c7", "Pant", "Chinos and trousers"),
  category("c8", "Cargo", "Cargo pants and joggers"),
];

// Demo admin account so the admin pages can be used without a backend.
export const seedUsers = [
  {
    id: "U-ADMIN",
    name: "Admin",
    email: "admin@eleven.com",
    password: "admin123",
    phone: "",
    address: "",
    role: "admin",
    status: "Active",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];
