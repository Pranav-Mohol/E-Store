var mongoose = require("mongoose");
var schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");


var userSchema = new schema({

    name: {
        type : String,
        trim : true,
        required : true,
        maxlength : 32
    },
    lastName : {
        type : String,
        trim : true,
        maxlength : 32
    },
    email : {
        type : String,
        maxlength : 32,
        required : true
    },
    encry_pwd : {
        type : String,
        required : true,
    },
    salt:String,

    role : {
        type : Number,
        default : 0
    },

    purchases : {
        type: Array,
        default: []
    }

}   ,{timestamps: true }
);

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_pwd = this.securePassword(password)
    })
    .get(function(){
        return this._password;
    })

userSchema.methods ={
    authenticate : function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_pwd
    },

    securePassword : function (plainpassword) {
        if(!plainpassword) return "";
        try{

            return crypto
            .createHmac("sha256",this.salt)
            .update(plainpassword)
            .digest("hex")

        }catch(error) {
            return "";
        }
    }

};

module.exports = mongoose.model("User",userSchema )