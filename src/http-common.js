import axios from "axios";
export default axios.create({
    baseURL: "https://testing-scandiweb.42web.io/scandiweb/product/",
    // baseURL: "https://romedical.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});