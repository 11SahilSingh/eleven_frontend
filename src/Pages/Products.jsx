import React, { useState, useEffect } from "react";

const Products = () => {
    // 1. Declare component states
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Fetch products from your backend API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Adjust the URL endpoint if your backend expects parameters
                const response = await fetch("http://localhost:8080/indivisualController/getProduct?productPkId=null");

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                // Handles response whether it returns an array directly or inside a wrapper object (e.g., data.data or data.products)
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else if (Array.isArray(data.data)) {
                    setProducts(data.data);
                } else if (data && typeof data === "object") {
                    // If backend returns a single product object instead of array
                    setProducts([data]);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // 3. Render Loading State
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5"
                }}
            >
                <h2>Loading products...</h2>
            </div>
        );
    }

    // 4. Render Error State
    if (error) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5",
                    color: "#d9534f"
                }}
            >
                <h2>Error loading products</h2>
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: "10px 20px",
                        marginTop: "10px",
                        backgroundColor: "#333",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    // 5. Render Main UI
    return (
        <div
            style={{
                padding: "100px 40px 40px 40px",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh"
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "40px"
                }}
            >
                Products
            </h1>

            {products.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <h3>No products found.</h3>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "25px"
                    }}
                >
                    {products.map((product, index) => {
                        // Fallbacks to handle common database/Java backend property names
                        const id = product.productPkId || product.id || index;
                        const name = product.productName || product.name || "Untitled Product";
                        const price = product.productPrice || product.price || 0;
                        const image = product.productImage || product.image || "https://via.placeholder.com/300";

                        return (
                            <div
                                key={id}
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
                                }}
                            >
                                <img
                                    src={image}
                                    alt={name}
                                    style={{
                                        width: "100%",
                                        height: "300px",
                                        objectFit: "cover"
                                    }}
                                    onError={(e) => {
                                        // Fallback if the image URL fails to load
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300?text=No+Image";
                                    }}
                                />

                                <div style={{ padding: "15px" }}>
                                    <h3>{name}</h3>

                                    <h4>₹{price}</h4>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginTop: "15px"
                                        }}
                                    >
                                        <button
                                            style={{
                                                border: "none",
                                                padding: "10px",
                                                cursor: "pointer",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            ❤️
                                        </button>

                                        <button
                                            style={{
                                                backgroundColor: "black",
                                                color: "white",
                                                border: "none",
                                                padding: "10px 15px",
                                                cursor: "pointer",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>

                                    <button
                                        style={{
                                            width: "100%",
                                            marginTop: "10px",
                                            padding: "10px",
                                            backgroundColor: "#444",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Products;