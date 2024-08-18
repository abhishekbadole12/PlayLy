import axios from "axios";
import { URL } from "./api";

const SignIn = async (data) => {
  try {
    const res = await axios.post(`${URL}/users/login`, data);
    console.log(res.data);
  } catch (error) {
    throw new Error(error.response?.data.message);
  }
};

const SignUp = async (data) => {
  try {
    const res = await axios.post(`${URL}/users/register`, data);
    console.log(res.data);
  } catch (error) {
    return null;
  }
};

export { SignIn, SignUp };
