import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import { formatPrice } from "../utils/format";

const LINKS = [
  { to: "/admin/add-product", title: "Add Product", text: "Create a new product listing" },
  { to: "/admin/products", title: "Manage Products", text: "Edit prices, stock and details" },
  { to: "/admin/add-category", title: "Add Category", text: "Create a new category" },
  { to: "/admin/categories", title: "Manage Categories", text: "Rename or remove categories" },
  { to: "/admin/orders", title: "Manage Orders", text: "Update order status" },
  { to: "/admin/users", title: "Manage Users", text: "Block or remove customers" },
];

function AdminDashboard() {
  const { products, categories, orders, users } = useStore();

  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const lowStock = products.filter(
    (p) => p.stock !== undefined && p.stock !== null && Number(p.stock) <= 5
  ).length;

  const stats = [
    { label: "Products", value: products.length },
    { label: "Categories", value: categories.length },
    { label: "Orders", value: orders.length },
    { label: "Pending Orders", value: pendingOrders },
    { label: "Customers", value: users.filter((u) => u.role !== "admin").length },
    { label: "Revenue", value: formatPrice(revenue) },
    { label: "Low Stock (≤5)", value: lowStock },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", marginBottom: "40px" }}>
          {stats.map((s) => (
            <div key={s.label} className="card" style={{ padding: "18px" }}>
              <p className="muted" style={{ fontSize: "14px" }}>{s.label}</p>
              <p className="stat-value">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="card">
              <h2>{link.title}</h2>
              <p className="muted" style={{ marginTop: "8px" }}>{link.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
