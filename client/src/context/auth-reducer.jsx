import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "./auth-actions";

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        msg: action.payload.msg,
        isLoading: false,
      };

    case REGISTER_USER_ERROR:
      return {
        isLoading: false,
        msg: action.payload.msg,
      };

    case LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGIN_USER_ERROR:
      return {
        isLoading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
      };
    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default authReducer;
