import React, {useEffect, useCallback, useState, Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteProducts, retrieveProducts} from "../../slices/products";
import "./Products.css";
// import axios from "axios";

const Products = () => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    const initFetch = useCallback(() => {
        dispatch(retrieveProducts());
    }, [dispatch]);

    useEffect(() => {
        initFetch()
    }, [initFetch]);

    console.log(products);

    const handleMassDelete = () => {
        // Dispatch the deleteProducts action with selectedProductIds
        dispatch(deleteProducts(selectedProductIds))
            .then(() => {
                // Reset selectedProductIds after successful deletion
                setSelectedProductIds([]);
                dispatch(retrieveProducts());
            })
            .catch((error) => {
                console.error("Error deleting products:", error);
                // Handle error if needed
            });
    };

    const handleCheckboxChange = (productId) => {
        // Toggle the selected status of the product ID
        setSelectedProductIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(productId)) {
                return prevSelectedIds.filter((id) => id !== productId);
            } else {
                return [...prevSelectedIds, productId];
            }
        });
    };

    console.log(selectedProductIds)

        return (
            <Fragment>
                <button
                    type="button"
                    onClick={handleMassDelete}
                    id="delete-product-btn"
                    style={{ marginBottom: "0.6rem", marginRight: "45%", marginLeft: "45%", width: "10" }}
                >
                    MASS DELETE
                </button>
                { products.map((product, key) => (
                    <div className="product" key={product.id}>
                        <div className="delete-checkbox" style={{color: 'white'}}>
                                <input
                                    type="checkbox"
                                    name={ product.id}
                                    checked={selectedProductIds.includes(product.id)}
                                    onChange={() => handleCheckboxChange(product.id)}
                                />
                        </div>
                        <div>
                            {product.sku}

                        </div>
                        <div>
                            {product.name}

                        </div>
                        <div>
                            {"$" + product.price}
                        </div>
                        <div>
                            {product.type}
                        </div>
                        <div>
                            {product.type === "Electronics" ? <div>
                                {"Size: " + product.size + " MB"}
                            </div> : "" || product.type === "Book" ? <div>
                                    {"Weight: " + product.weight + " KG"}
                                </div> : "" || product.type === "Furniture" ? <div>
                                {"Dimensions: " + product.height + "x" + product.width + "x" + product.length}
                            </div> : ""}
                        </div>
                    </div>
                ))
                }

            </Fragment>
        )
    }

export default Products;
