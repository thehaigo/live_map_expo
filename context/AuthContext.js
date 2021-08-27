import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import { liveMapApi } from "../api/liveMap";

const SIGNIN = "SIGNIN";
const SIGNOUT = "SIGNOUT";
const ADD_ERROR = "ADD_ERROR";
const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNIN:
      return { errorMessage: "", token: action.payload };
    case SIGNOUT:
      return { errorMessage: "", token: null };
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const initAuthState = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: SIGNIN, payload: token });
    } else {
      dispatch({ type: SIGNOUT });
    }
  } catch (e) {
    dispatch({ type: SIGNOUT });
  }
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
    try {
      const response = await liveMapApi.post("/sign_up", {
        user: { email: email, password: password },
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: SIGNIN, payload: response.data.token });
    } catch {
      console.log(error.response);
      dispatch({
        type: ADD_ERROR,
        payload: Object.entries(error.response.data.errors),
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
    try {
      const response = await liveMapApi.post("/sign_in", {
        email: email,
        password: password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: SIGNIN, payload: response.data.token });
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_ERROR, payload: [["error", ["login error"]]] });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: SIGNOUT });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: CLEAR_ERROR_MESSAGE });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    initAuthState,
    clearErrorMessage,
  },
  { token: null, errorMessage: "" }
);
