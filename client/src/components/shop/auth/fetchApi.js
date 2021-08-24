import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const activationEmailReq = async (activation_token) => {
  try {
    let res = await axios.post(`${apiURL}/api/activation`, { activation_token });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassReq = async (email) => {
  try {
    let res = await axios.post(`${apiURL}/api/forgot`, { email });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassReq = async (password, access_token) => {
  try {
    let res = await axios.post(`${apiURL}/api/reset`, { password }, {
      headers: { Authorization: access_token }
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};