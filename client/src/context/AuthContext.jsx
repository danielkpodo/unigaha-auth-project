import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "./auth-actions";
import { createContext, useContext, useReducer } from "react";
import { errorToast, successToast } from "../utils/toast";

import authReducer from "./auth-reducer";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
};

const AuthContext = createContext({ ...initialState });

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const addUserToLocalStorage = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const baseURL = "http://localhost:8001/api/v1";

  const registerUser = async (payload) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const response = await axios.post(`${baseURL}/auth/register`, payload);
      const { user, token, msg } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, msg },
      });

      addUserToLocalStorage(user, token);
      successToast(msg, "top-right");
    } catch (error) {
      const { msg } = error.response.data;
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg },
      });
      errorToast(msg, "top-right");
    }
  };

  const loginUser = async (payload) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const response = await axios.post(`${baseURL}/auth/login`, payload);
      const { user, token, msg } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, msg },
      });
      addUserToLocalStorage(user, token);
      successToast(msg, "top-right");
    } catch (error) {
      const { msg } = error.response.data;
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg },
      });
      errorToast(msg, "top-right");
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AuthContext.Provider
      value={{ ...state, registerUser, logoutUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
