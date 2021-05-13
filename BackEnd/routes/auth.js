var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin } = require("../controllers/auth");

router.post("/signup", 
    [   check("name").isLength({ min: 3 }).withMessage("Name Should be at least 3 Character"),
        check("email").isEmail().withMessage("Please Enter Valid Mail ID"),
        check("password").isLength({ min: 3 }).withMessage("password should be at least 3 char")
    ], signup);


router.get("/signout", signout);

router.post("/signin", 
    [   
        check("email").isEmail().withMessage("Please Enter Valid Mail ID"),
        check("password").isLength({ min: 3 }).withMessage("Please Enter Correct Passowrd")
    ], signin); 

module.exports = router;
