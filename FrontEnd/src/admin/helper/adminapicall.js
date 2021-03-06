import { API } from "../../backend";

//category Calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}category/create/${userId}`, {
        method : "POST",
        headers : {
        Accept: "application/json",
        "Content-Type" : "application/json",
        Authorization :`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
     .then(response => {
         return response.json();
     })
     .catch(err => {
         console.log(err);
     })
}

export const getAllCategories = () => {
    return fetch(`${API}categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}


//product calls

//create prodcut
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers : {
            Accept: "application/json",
            Authorization :`Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

//get All Products
export const getAllProducts = () => {
    return fetch(`${API}products`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}
//delete a product
export const deleteProduct = (userId, token, productId) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers : {
            Accept: "application/json",
            Authorization :`Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}


//get a product
export const getProduct = productId => {
    return fetch(`${API}product/${productId}`, {
      method: "GET",
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
};


//update a product
export const updateProduct = (userId, token, productId, product) => {
    console.log("In the updateProduct API")
    return fetch(`${API}product/${productId}/${userId}`, {
        method: "PUT",
        headers : {
            Accept: "application/json",
            Authorization :`Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}
