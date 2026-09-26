import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {

    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            name: "Men",
            image: "https://via.placeholder.com/250x250?text=Men"
        },
        {
            id: 2,
            name: "Women",
            image: "https://via.placeholder.com/250x250?text=Women"
        },
        {
            id: 3,
            name: "Kids",
            image: "https://via.placeholder.com/250x250?text=Kids"
        },
        {
            id: 4,
            name: "Sports",
            image: "https://via.placeholder.com/250x250?text=Sports"
        }
    ];

    return (
        <div
            style={{
                padding: "40px",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "40px"
                }}
            >
                Shop By Category
            </h1>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    flexWrap: "wrap"
                }}
            >

                {categories.map((category) => (

                    <div
                        key={category.id}
                        onClick={() => navigate(`/products/${category.id}`)}
                        style={{
                            width: "250px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            overflow: "hidden",
                            cursor: "pointer",
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
                        }}
                    >

                        <img
                            src={category.image}
                            alt={category.name}
                            style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover"
                            }}
                        />

                        <h3
                            style={{
                                textAlign: "center",
                                padding: "15px"
                            }}
                        >
                            {category.name}
                        </h3>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Categories;