import React, {useEffect, useCallback, useState, Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import {retrieveProducts} from "../../slices/products";
import "./Products.css";
import axios from "axios";

const Products = () => {
    const items = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);

    const initFetch = useCallback(() => {
        dispatch(retrieveProducts());
    }, [dispatch]);

    useEffect(() => {
        initFetch()
    }, [initFetch]);

    useEffect(()=>{
        setUserData(items);
    }, [items]);

    console.log(items);

    const handleChange=(e)=> {
        const {name, checked} = e.target;
        if (name === "allselect") {
            const checkedValue = userData.map((user) => {
                return {...user, isChecked: checked}
            });
            console.log(checkedValue);
            setUserData(checkedValue);
            } else {
                const checkedValue = userData.map((user) =>
                    user.id.toString() === name ? {...user, isChecked: checked} : user);
                console.log(checkedValue);
                setUserData(checkedValue);
            }
        }

    const handleAllDelete = async() => {
        const checkedInputValue = [];
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].isChecked === true) {
                checkedInputValue.push(parseInt(userData[i].id));
            }
            // else {
            //     alert("Please select at least one checkbox");
            // }
            // return;
        }
        console.log(JSON.stringify(checkedInputValue))
        const response = await axios.post('https://ecoliving2022-001-site1.btempurl.com/scandiweb/product/delete_records.php', JSON.stringify(checkedInputValue))
        // const response = await fetch('http://localhost/scandiweb/product/delete_records.php', JSON.stringify(checkedInputValue))
        console.log(response)
    }

        return (
            <Fragment>
                <button
                    type="button"
                    onClick={() => {handleAllDelete(); window.location.reload(false)}}
                    id="delete-product-btn"
                    style={{ marginBottom: "0.6rem", marginRight: "45%", marginLeft: "45%", width: "10" }}
                >
                    MASS DELETE
                </button>
                {/*<input type="checkbox"*/}
                {/*       name="allselect"*/}
                {/*       checked= { !userData.some( (user)=>user?.isChecked!==true)}*/}
                {/*       onChange={ handleChange}  />*/}

                { userData.map((getProduct, key) => (
                    <div className="product" key={getProduct.id}>
                        <div className="delete-checkbox" style={{color: 'white'}}>
                                <input
                                    type="checkbox"
                                    name={ getProduct.id}
                                    checked={getProduct?.isChecked || false }
                                    onChange={ handleChange }
                                />
                        </div>
                        <div>
                            {getProduct.sku}

                        </div>
                        <div>
                            {getProduct.name}

                        </div>
                        <div>
                            {getProduct.price + " $"}
                        </div>
                        <div>
                            {getProduct.type}
                        </div>
                        <div>
                            {getProduct.type === "dvd" ? <div>
                                {"Size: " + getProduct.size + " MB"}
                            </div> : "" || getProduct.type === "book" ? <div>
                                    {"Weight: " + getProduct.weight + " KG"}
                                </div> : "" || getProduct.type === "furniture" ? <div>
                                {"Dimension: " + getProduct.height + "x" + getProduct.width + "x" + getProduct.length}
                            </div> : ""}
                        </div>
                    </div>
                ))
                }

            </Fragment>
        )
    }

export default Products;
