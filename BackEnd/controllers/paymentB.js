var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "9r9q8hbrwh9dfsgq",
  publicKey: "y9grtmph2hdt9z39",
  privateKey: "9213271b7aab9bb9f76bad7399001cf1"
});

exports.getToken = (req, res) => {
  console.log("In the getToken");
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            console.log("Error Exits Here");
            res.status(500).send(err)
        }else {
            res.send(response);
        }
    });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromtheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromtheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if (err) {
            res.status(500).send(err)
        }else {
            res.send(result);
        }

      });
}