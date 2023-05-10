import http from "../http-common";

const getAllProducts = () => {
    return http.get("read.php");
};

const createProduct = data => {
    return http.post("/create.php", data);
};

const ProductDataService = {
    getAllProducts,
    // getPatientById,
    createProduct,
    // updatePatient,
    // removePatient,
    // findByName
};

export default ProductDataService;