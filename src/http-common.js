import axios from "axios";
export default axios.create({
    baseURL: "https://bizairi-001-site1.itempurl.com/scandiweb_3/product/",
    // baseURL: "https://romedical.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});
