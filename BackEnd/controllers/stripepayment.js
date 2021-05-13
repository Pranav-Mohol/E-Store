const SK = process.env.SECRET_KEY
const stripe = require("stripe")(SK);
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS are : ", products);
  console.log("TOKEN IS ", token);

  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuid();
  console.log("email is ", token.email);
  console.log("Source is  ", token.id)
  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },
          {
            idempotencyKey
          }
        )
        .then(  console.log("Payment Successful"),
          result => res.status(200).json(result))
        .catch(err => console.log(err));
    })
    .catch(console.log("FAILED"));
};
