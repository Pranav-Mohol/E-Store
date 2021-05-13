import { API } from "../../backend";


//signup req to backend
export const signup = user => {
  return fetch(`${API}signup`,{
    method: "POST",
    headers: {
      Accept : "application/json",
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

//signin req to backend
export const signin = user => {
  return fetch(`${API}signin`,{
    method: "POST",
    headers: {
      Accept : "application/json",
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

//signout req to backend
export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart")
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("Signout Success"))
      .catch(err => console.log(err))
  }
}


//to signin it sets token
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};


//to validate user
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
     return false;
  }
  if(localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};



