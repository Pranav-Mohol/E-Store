const express = require("express");
const router = express.Router();


//importing middlewares
const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require("../controllers/order")
const { 
    isSignedIn, 
    isAdmin, 
    isAuthenticated 
} = require("../controllers/auth");
const {
    updateStock
} = require("../controllers/product");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");


//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual routes
//create
router.post("/order/create/:userId", 
    isSignedIn, 
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
);
//read
router.get("/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
)

//status of order
router.get("/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);
//updateStatus
router.put("/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);
  
module.exports = router;