import http from "../http-common";

const getAllProducts = () => {
    return http.get("/index.php");
};

const createProduct = data => {
    return http.post("/index.php", data);
};

const deleteProductsByIds = productIds => {
    const productIdsString = Array.isArray(productIds) ? productIds.join(',') : productIds;
    return http.delete("/index.php", { params: { ids: productIdsString } });
};

const ProductDataService = {
    getAllProducts,
    createProduct,
    deleteProductsByIds
};

export default ProductDataService;