# ELEVEN – Fashion Store (React + Vite)

## Run it

```bash
npm install
npm run dev
```

## Backend

Products are loaded from the Spring Boot API at `http://localhost:8080`
(`/indivisualController/getProduct`). If it isn't reachable, the app shows a
built-in sample catalog instead. To use a different backend URL, copy
`.env.example` to `.env` and change `VITE_API_URL`.

All API calls live in `src/api.js`. Login, registration, cart, orders and the
admin pages currently save their data in the browser (localStorage) through
`src/context/StoreProvider.jsx`. When the matching backend endpoints exist, add
them to `src/api.js` and call them from the store.

> Passwords are stored in the browser only for this demo. Replace this with
> backend authentication before going live.

## Demo admin account

- Email: `admin@eleven.com`
- Password: `admin123`

## Main routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/products?category=Men&search=shirt` | Product list with filters |
| `/product/:id` | Product details |
| `/category` | Categories |
| `/cart`, `/wishlist` | Cart, wishlist |
| `/login`, `/register` | Account |
| `/checkout`, `/orders`, `/userprofile` | Logged-in pages |
| `/adminDashboard`, `/admin/*` | Admin pages (admin only) |
