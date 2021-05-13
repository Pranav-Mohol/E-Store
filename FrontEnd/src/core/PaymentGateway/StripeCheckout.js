import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth/helper';
import { cartEmpty, loadCart } from '../helper/CartHelper';
import { Link } from 'react-router-dom';
import Stripe from 'react-stripe-checkout';
import { API, PUBLICKEY } from '../../backend';
import { createOrder } from '../helper/OrderHelper';


const StripeCheckout = ({
    products,
    setReload = f => f, 
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        sucess : false,
        error : "",
        address : ""
    })

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;
   
    const getFinalPrice = () => {
        var amount=0;
        if(products) {
        products.map(p => {
            amount = amount + p?.price;
        })
        }
        return amount;
    }

    const makePayment = token => {
        const body = {
            token,
            products,
        }
        const headers = {
            "Content-Type" : "application/json"
        }

        return fetch(`${API}stripepayment`,{
            method : "POST",
            headers,
            body : JSON.stringify(body)
        }).then(response => {
            console.log(response);
            //call methods
        }).catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? ( <Stripe
            stripeKey = {PUBLICKEY}
            token = {makePayment}
            amount = {getFinalPrice() * 100}
            name = "Buy Goods"
            shippingAddress
            billingAddress
            > 
            <button className="btn btn-success"> Pay with Stripe</button>
            </Stripe> )
        : ( <Link to="/signin">
            <button className="btn btn-warning">Sign In to Purchase</button>
            </Link>
        );
    }

    return (
        <div>
            <h2 className="text-white">Stripe Checkout {getFinalPrice()}</h2>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;