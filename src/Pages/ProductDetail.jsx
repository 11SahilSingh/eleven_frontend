import React, { useState } from "react";

const ProductDetail = () => {

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("M");

    const product = {
        id: 1,
        name: "Black Hoodie",
        price: 999,
        description:
            "Premium quality black hoodie made from 100% cotton. Comfortable, stylish and perfect for everyday wear.",
        image: "https://via.placeholder.com/500x600?text=Black+Hoodie"
    };

    return (
        <div
            style={{
                paddingTop: "100px",
                paddingLeft: "50px",
                paddingRight: "50px",
                minHeight: "100vh"
            }}
        >

            <div
                style={{
                    display: "flex",
                    gap: "50px",
                    flexWrap: "wrap"
                }}
            >

                {/* Product Image */}

                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: "450px",
                            borderRadius: "10px"
                        }}
                    />
                </div>

                {/* Product Info */}

                <div style={{ flex: 1 }}>

                    <h1>{product.name}</h1>

                    <h2>₹{product.price}</h2>

                    <p>
                        ⭐⭐⭐⭐⭐ (120 Reviews)
                    </p>

                    <h3>Select Size</h3>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "20px"
                        }}
                    >
                        {["S", "M", "L", "XL"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                style={{
                                    padding: "10px 15px",
                                    border:
                                        selectedSize === size
                                            ? "2px solid black"
                                            : "1px solid gray",
                                    backgroundColor:
                                        selectedSize === size
                                            ? "black"
                                            : "white",
                                    color:
                                        selectedSize === size
                                            ? "white"
                                            : "black",
                                    cursor: "pointer"
                                }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <h3>Quantity</h3>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            marginBottom: "20px"
                        }}
                    >
                        <button
                            onClick={() =>
                                quantity > 1 &&
                                setQuantity(quantity - 1)
                            }
                        >
                            -
                        </button>

                        <span>{quantity}</span>

                        <button
                            onClick={() =>
                                setQuantity(quantity + 1)
                            }
                        >
                            +
                        </button>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            marginTop: "20px"
                        }}
                    >
                        <button
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                padding: "12px 20px",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "5px"
                            }}
                        >
                            Add To Cart
                        </button>

                        <button
                            style={{
                                backgroundColor: "white",
                                border: "1px solid black",
                                padding: "12px 20px",
                                cursor: "pointer",
                                borderRadius: "5px"
                            }}
                        >
                            ❤️ Wishlist
                        </button>
                    </div>

                    <div
                        style={{
                            marginTop: "40px"
                        }}
                    >
                        <h3>Description</h3>

                        <p>{product.description}</p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetail;