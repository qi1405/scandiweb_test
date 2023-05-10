import axios from "axios";
export default axios.create({
    baseURL: "https://scandiweb-test-dimmy.000webhostapp.com/product/",
    // baseURL: "https://romedical.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});