import { useEffect, useRef, useState } from "react";
import StoreContext from "./store-context";
import usePersistentState from "../hooks/usePersistentState";
import { fetchProducts } from "../api";
import { sampleCategories, sampleProducts, seedUsers } from "../data/sampleData";

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

const makeId = (prefix) =>
  `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`.toUpperCase();

// Central app state: catalog, cart, wishlist, auth, orders and admin actions.
// Everything is kept in localStorage until the matching backend APIs exist.
export default function StoreProvider({ children }) {
  const [products, setProducts] = usePersistentState("eleven_products", sampleProducts);
  const [categories, setCategories] = usePersistentState("eleven_categories", sampleCategories);
  const [cart, setCart] = usePersistentState("eleven_cart", []);
  const [wishlist, setWishlist] = usePersistentState("eleven_wishlist", []);
  const [users, setUsers] = usePersistentState("eleven_users", seedUsers);
  const [currentUserId, setCurrentUserId] = usePersistentState("eleven_current_user", null);
  const [orders, setOrders] = usePersistentState("eleven_orders", []);

  const [productSource, setProductSource] = useState("local");
  const [productsLoading, setProductsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Load products from the Spring Boot backend; keep the local catalog if it is unavailable.
  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((list) => {
        if (cancelled) return;
        if (list.length > 0) {
          setProducts(list);
          setProductSource("backend");
        }
      })
      .catch((err) => {
        console.warn("Backend not reachable, using local products:", err.message);
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [setProducts]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = (message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  // ---------- Auth ----------
  const foundUser = users.find((u) => u.id === currentUserId) || null;
  const currentUser = foundUser && foundUser.status !== "Blocked" ? foundUser : null;
  const isAdmin = currentUser?.role === "admin";

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const user = {
      id: makeId("U"),
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: "",
      address: "",
      role: "customer",
      status: "Active",
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, user]);
    setCurrentUserId(user.id);
    notify(`Welcome to ELEVEN, ${user.name}!`);
    return { ok: true, user };
  };

  const login = (email, password) => {
    const user = users.find((u) => u.email === email.trim().toLowerCase());
    if (!user || user.password !== password) {
      return { ok: false, error: "Incorrect email or password." };
    }
    if (user.status === "Blocked") {
      return { ok: false, error: "This account has been blocked. Please contact support." };
    }
    setCurrentUserId(user.id);
    notify(`Welcome back, ${user.name}!`);
    return { ok: true, user };
  };

  const logout = () => {
    setCurrentUserId(null);
    notify("You have been logged out.");
  };

  const updateProfile = (fields) => {
    setUsers((prev) => prev.map((u) => (u.id === currentUserId ? { ...u, ...fields } : u)));
    notify("Profile updated.");
  };

  // ---------- Cart ----------
  const addToCart = (product, { size = product.sizes?.[0] ?? null, quantity = 1 } = {}) => {
    const key = `${product.id}-${size ?? "one-size"}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.image,
          size,
          quantity,
        },
      ];
    });
    notify(`${product.name} added to cart.`);
  };

  const updateCartQuantity = (key, quantity) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((item) => (item.key === key ? { ...item, quantity } : item)));
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee =
    cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const cartTotal = cartSubtotal + shippingFee;

  // ---------- Wishlist ----------
  const isInWishlist = (productId) => wishlist.includes(productId);

  const toggleWishlist = (productId) => {
    const exists = wishlist.includes(productId);
    setWishlist((prev) =>
      exists ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    notify(exists ? "Removed from wishlist." : "Added to wishlist.");
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const wishlistProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  // ---------- Orders ----------
  const myOrders = currentUser ? orders.filter((o) => o.userId === currentUser.id) : [];

  const placeOrder = ({ shipping, paymentMethod }) => {
    if (!currentUser || cart.length === 0) return null;

    const order = {
      id: `ORD${Date.now().toString().slice(-8)}`,
      userId: currentUser.id,
      customer: currentUser.name,
      email: currentUser.email,
      items: cart,
      subtotal: cartSubtotal,
      shippingFee,
      total: cartTotal,
      shipping,
      paymentMethod,
      status: "Pending",
      date: new Date().toISOString(),
    };

    setOrders((prev) => [order, ...prev]);
    // Reduce stock for the ordered products.
    setProducts((prev) =>
      prev.map((p) => {
        const qty = cart
          .filter((item) => item.productId === p.id)
          .reduce((sum, item) => sum + item.quantity, 0);
        return qty && p.stock !== undefined && p.stock !== null
          ? { ...p, stock: Math.max(0, Number(p.stock) - qty) }
          : p;
      })
    );
    if (!currentUser.address && shipping?.address) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, address: shipping.address, phone: u.phone || shipping.phone }
            : u
        )
      );
    }
    setCart([]);
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  // ---------- Admin: products ----------
  const addProduct = (data) => {
    const newProduct = { ...data, id: makeId("P") };
    setProducts((prev) => [newProduct, ...prev]);
    notify("Product added.");
    return newProduct;
  };

  const updateProduct = (id, data) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data, id } : p)));
    notify("Product updated.");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setWishlist((prev) => prev.filter((pid) => pid !== id));
    notify("Product deleted.");
  };

  // ---------- Admin: categories ----------
  const addCategory = (data) => {
    if (categories.some((c) => c.name.toLowerCase() === data.name.trim().toLowerCase())) {
      return { ok: false, error: "A category with this name already exists." };
    }
    setCategories((prev) => [...prev, { ...data, name: data.name.trim(), id: makeId("C") }]);
    notify("Category added.");
    return { ok: true };
  };

  const updateCategory = (id, data) => {
    const existing = categories.find((c) => c.id === id);
    const newName = data.name.trim();
    if (
      categories.some((c) => c.id !== id && c.name.toLowerCase() === newName.toLowerCase())
    ) {
      return { ok: false, error: "A category with this name already exists." };
    }
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data, name: newName, id } : c))
    );
    // Keep products pointing at the renamed category.
    if (existing && existing.name !== newName) {
      setProducts((prev) =>
        prev.map((p) => (p.category === existing.name ? { ...p, category: newName } : p))
      );
    }
    notify("Category updated.");
    return { ok: true };
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    notify("Category deleted.");
  };

  // ---------- Admin: users ----------
  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u
      )
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    notify("User deleted.");
  };

  const value = {
    // catalog
    products,
    categories,
    productSource,
    productsLoading,
    // auth
    users,
    currentUser,
    isAdmin,
    register,
    login,
    logout,
    updateProfile,
    // cart
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    // wishlist
    wishlist,
    wishlistProducts,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    // orders
    orders,
    myOrders,
    placeOrder,
    updateOrderStatus,
    // admin
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleUserStatus,
    deleteUser,
    // ui
    toast,
    notify,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
