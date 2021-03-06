const express = require("express");
const router = express.Router();

const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    removeProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product")
const { 
    isSignedIn, 
    isAdmin, 
    isAuthenticated 
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);


//create
router.post("/product/create/:userId",
    isSignedIn,
    isAuthenticated, 
    isAdmin,
createProduct);
    
//read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//update
router.put("/product/:productId/:userId", 
    isSignedIn,
    isAuthenticated, 
    isAdmin,
updateProduct);

//delete
router.delete("/product/:productId/:userId", 
    isSignedIn,
    isAuthenticated, 
    isAdmin,
removeProduct);

//listing routes
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);


module.exports = router;
