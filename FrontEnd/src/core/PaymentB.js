import React, { useState, useEffect } from 'react';
import { loadCart, cartEmpty } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import { getMeToken, processPayment } from './PaymentGateway/PaymentBHelper';
import { isAuthenticated } from '../auth/helper';
import { createOrder } from './helper/OrderHelper';
import DropIn from 'braintree-web-drop-in-react';


const PaymentB = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

   const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  useEffect(() => {
    getToken(userId, token);
  }, []);


  const showbtdropIn = () => {
      return(
          <div>
             {info.clientToken !== null && products.length >0 ? (
             <div>
              <DropIn
                 options={{ authorization: info.clientToken }}
                 onInstance={(instance) => (info.instance = instance)}
              />
              <button className="btn btn-outline-success" 
               onClick={onPuarchas}>
                 Buy
              </button>
             </div> 
             ) 
             : (<h3>Please Login // Cart is Empty</h3>)}
          </div>
      )
  }

  const onPuarchas = () => {
    console.log("Inside On Purchase")
    setInfo({loading : true })
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data?.nonce
        const paymentData = {
          paymentMethodNonce : nonce,
          amount : getAmount()
        };
        processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({...info, success: response.success, loading : false,})
          console.log("PAYMENT SUCCESS")

          const orderData = {
            products : products,
            transaction_id : response.transaction_id,
            amount : response.transaction.amount,

          }
          createOrder(userId, token, orderData)
          cartEmpty()

          setReload(!reload)
        })
        .catch(err => {
          setInfo({loading : false, success : false})
          console.log("PAYMENT FAILED")

        })

      })
  }

  const getAmount = () => {
    let amount = 0;
    products.map( p => {
      amount = amount + p.price;
    })
    return amount;
  }

  const getToken = (userId, token) => {
    console.log("USER ID IS ", userId);
    console.log("TOKEN ID IS ", token);

    getMeToken(userId, token).then(info => {
      console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };



    return(
        <div>
            <h3>Your Bill is {getAmount()}</h3> 
            {showbtdropIn()}
        </div>
    )
}

export default PaymentB;