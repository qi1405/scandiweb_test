import axios from "axios";
export default axios.create({
    baseURL: "http://localhost/scandiweb/product/",
    // baseURL: "https://romedical.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});