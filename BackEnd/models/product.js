var mongoose = require("mongoose");
var schema = mongoose.Schema;
const {ObjectId} = schema;

var productSchema = new schema({
    name : {
        type : String,
        required : true,
        maxlength : 32
    },
    description : {
        type : String,
        required : true,
        maxlength : 2000
    },
    price : {
        type : Number,
        required : true,
        maxlength : 32
    },
    stock : {
        type : Number,
        required : true
    },
    sold : {
        type : Number,
        required : true,
        default : 0
    },
    photo : {
        data : Buffer,
        contentType : String
    },
    category : {
        type : ObjectId,
        ref : "Category",
        required : true
    }
    

},{timestamps : true});

module.exports = mongoose.model("Product", productSchema)
