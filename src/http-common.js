import axios from "axios";
export default axios.create({
    baseURL: "https://ecoliving2022-001-site1.btempurl.com/scandiweb/public/",
    // baseURL: "http://localhost/public",
    headers: {
        "Content-type": "application/json"
    }
});
