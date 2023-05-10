import Card from "../UI/Card";
import Products from "./components/Products";
import React from "react";
import "./components/Products.css";

function ProductList() {

    return(
        <div className="App">
        <header className="header">
            <p>Product Page</p>
        </header>
        <div className="container">
            <Card>
                <Products />
            </Card>
        </div>
        </div>
    )
}

export default ProductList;