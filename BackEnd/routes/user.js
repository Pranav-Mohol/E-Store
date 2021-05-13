var express = require("express");
var router = express.Router();

const { 
  getUserById, 
  getUser, 
  updateUser, 
  userPurchaseList 
} = require("../controllers/user");

const { 
   isSignedIn,
   isAuthenticated, 
   isAdmin 
} = require("../controllers/auth");

router.param("userId", getUserById);

//:userId is middleware used at route user
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//same route name but different request type
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
    "/orders/user/:userId",
    isSignedIn,
    isAuthenticated,
    userPurchaseList
  );

module.exports = router;
