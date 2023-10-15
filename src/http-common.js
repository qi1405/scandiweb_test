import axios from "axios";
export default axios.create({
    baseURL: "https://ecoliving2022-001-site1.btempurl.com/scandiweb/product/",
    // baseURL: "https://romedical.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});
