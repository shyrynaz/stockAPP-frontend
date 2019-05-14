import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

const url = "https://protected-retreat-99874.herokuapp.com";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${url}/api/users/register`, userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// login
export const loginUser = userData => dispatch => {
  axios
    .post(`${url}/api/users/login`, userData)
    .then(res => {
      //save to localStorage
      //set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to authHeader
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// logout user
export const logoutUser = () => dispatch => {
  //remove token from localStorade
  localStorage.removeItem("jwtToken");
  // remove auth header from future  requests
  setAuthToken(false);
  // set current user to empty obect {} which will set is authenticated to false
  dispatch(setCurrentUser({}));
};
