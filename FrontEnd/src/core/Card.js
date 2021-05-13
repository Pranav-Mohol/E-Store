import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";


const Card = ({ 
  product, 
  addtoCart = true, 
  removeFromCart = false, 
  setReload = f => f ,  //function(f){return f}
  reload = undefined 
  }) => {

  const [redirect, setRedirect] = useState(false);


  const cartName = product.name;
  const cartDescription = product.description;
  const cartPrice = product.price;

  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  }

  const getRedirect = (redirect) =>{
    if(redirect){
      return <Redirect to="/cart" />
    }
  }

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartName}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
