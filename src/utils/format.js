export const formatPrice = (value) =>
  `₹${(Number(value) || 0).toLocaleString("en-IN")}`;

export const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value ?? "");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const PAYMENT_LABELS = {
  COD: "Cash On Delivery",
  UPI: "UPI",
  CARD: "Debit/Credit Card",
};

export const ORDER_STATUSES = ["Pending", "Shipped", "Delivered", "Cancelled"];
