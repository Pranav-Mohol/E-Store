const User = require("../models/user");
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec( (err, user) => {
        if(err || !user) {
            return res.status(403).json({
                error:"User Not Found"
            });
        }

        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_pwd = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.__v = undefined;

    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(304).json({
            error: "Database Not Modified"
          });
        }
        user.salt = undefined;
        user.encry_pwd = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        user.__v = undefined;
        res.json(user);
      }
    );
};

exports.userPurchaseList = (req, res) =>{
    Order.find({user : req.profile._id})
    .populate("user", "_id name password")
    .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No Order in this account"
          });
        }
        return res.json(order);
      });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //store this data in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        });
      }
      next();
    }
  );
};
