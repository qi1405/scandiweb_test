import React, {useCallback, useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Card from "../UI/Card";
import "./components/AddProduct.css";
import {createProduct, retrieveProducts} from "../slices/products";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AddProduct() {
    // const [userData, setUserData] = useState([]);
    const items = useSelector(state => state.products);
    const dispatch1 = useDispatch();
    const [invalidData, setInvalidData] = useState(true);
    const [divType, setDivType] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch1(retrieveProducts());
    }, [dispatch1]);

    useEffect(() => {
        initFetch()
    }, [initFetch]);

    console.log(items)

    const initialProductState = {
        id: null,
        name: "",
        price: null,
        type: "",
        sku: "",
        size: null,
        weight: null,
        height: null,
        width: null,
        length: null,
    };

    const [product, setProduct] = useState(initialProductState);

    const saveProduct = () => {
        const {name, price, type, sku, size, weight, height, width, length} =
            product;
        dispatch(
            createProduct({
                name, price, type, sku, size, weight, height, width, length
            })
        )
            .unwrap()
            .then((data) => {
                console.log(data);
                setProduct({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    type: data.type,
                    sku: data.sku,
                    size: data.size,
                    weight: data.weight,
                    height: data.height,
                    width: data.width,
                    length: data.length
                });
                console.log(product);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setProduct({...product, [name]: value});

        if (name === "sku") {
            const skuExists = items.some((item) => item.sku === value);
            setInvalidData(skuExists);
        }
    };

    // function checkSku() {
    //
    // }

    const productPage = () => {
        navigate("/")
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(invalidData)
        if(invalidData) {
            alert("The entered SKU already exists, please use a different one!")
        }else{
            // alert("data is ok, submit")
            saveProduct();
            productPage();
        }
    }

        const GetDivType = () => {
            switch (divType) {
                case "dvd":
                    return (
                        <>
                            <div className="">
                                <label htmlFor="size">Size (MB)</label>
                                <input
                                    type="text"
                                    className=""
                                    id="size"
                                    value={product.size || ""}
                                    onChange={handleInputChange}
                                    name="size"
                                    required pattern="^[0-9]+$"
                                />
                            </div>
                            <p>Please provide size in MB format.</p>
                        </>
                    );
                case "book":
                    return (
                        <>
                            <div className="">
                                <label htmlFor="weight">Weight (KG)</label>
                                <input
                                    type="text"
                                    className=""
                                    id="weight"
                                    required pattern="^[0-9]+$"
                                    value={product.weight || ""}
                                    onChange={handleInputChange}
                                    name="weight"
                                />
                            </div>
                            <p>Please provide weight in KG format.</p>
                        </>
                    );
                case "furniture":
                    return (
                        <>
                            <div className="">
                                <label htmlFor="height">Height (CM)</label>
                                <input
                                    type="text"
                                    className=""
                                    id="height"
                                    required pattern="^[0-9]+$"
                                    value={product.height || ""}
                                    onChange={handleInputChange}
                                    name="height"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="width">Width (CM)</label>
                                <input
                                    type="text"
                                    className=""
                                    id="width"
                                    required pattern="^[0-9]+$"
                                    value={product.width || ""}
                                    onChange={handleInputChange}
                                    name="width"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="length">Length (CM)</label>
                                <input
                                    type="text"
                                    className=""
                                    id="length"
                                    required pattern="^[0-9]+$"
                                    value={product.length || ""}
                                    onChange={handleInputChange}
                                    name="length"
                                />
                            </div>
                                <p>Please provide dimensions in HxWxL format.</p>
                        </>
                    );
                default:
                    return null;
            }
        }

        return (
            <div className="App">
                <header className="header">
                    <p>Add Product page!</p>
                </header>
                <div className="container">
                    <Card>
                        <form onSubmit={handleSubmit} onChange={handleInputChange} className="form-inline" id="product_form">
                            <div className="">
                                <label htmlFor="sku">SKU</label>
                                <input
                                    type="text"
                                    className=""
                                    id="sku"
                                    required
                                    value={product.sku}
                                    onChange={handleInputChange}
                                    name="sku"
                                    // onBlur={checkSku}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className=""
                                    id="name"
                                    required
                                    value={product.name || ""}
                                    onChange={handleInputChange}
                                    name="name"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="price">Price ($)</label>
                                <input
                                    type="text"
                                    className=""
                                    id="price"
                                    required pattern="^[0-9]+$"
                                    value={product.price || ""}
                                    onChange={handleInputChange}
                                    name="price"
                                />
                            </div>
                            <div>
                                <label htmlFor="type">Type Switcher</label>
                                <select name="type" id="type" onClick={(event) => {
                                    setDivType(event.target.value);
                                }} onChange={handleInputChange}>
                                    <option value="" defaultValue="selected" hidden="hidden">Choose here</option>
                                    <option value="dvd" onChange={handleInputChange}>DVD</option>
                                    <option value="book" onChange={handleInputChange}>Book</option>
                                    <option value="furniture" onChange={handleInputChange}>Furniture</option>
                                </select>
                            </div>
                            <div className="form-inline" id="productType">
                            {GetDivType()}
                            </div>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <button
                                    type="submit"
                                    className="button"
                                    style={{marginBottom: "0.6rem"}}
                                >
                                    Save
                                </button>
                                <button
                                    id="cancel"
                                    type="button"
                                    onClick={productPage}
                                    className="button"
                                    style={{marginBottom: "0.6rem"}}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        )

}
export default AddProduct;