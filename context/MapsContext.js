import { liveMapApi } from "../api/liveMap";
import createDataContext from "./createDataContext";

const GET_MAPS = "GET_MAPS";
const CREATE_MAP = "CREATE_MAP";
const UPDATE_MAP = "UPDATE_MAP";
const DELETE_FOLDER = "DELETE_FOLDER";
const ADD_ERROR = "ADD_ERROR";
const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";

const mapReducer = (state, action) => {
  switch (action.type) {
    case GET_MAPS:
      return { ...state, maps: action.payload };
    case CREATE_MAP:
      return { ...state, maps: [...state.maps, action.payload] };
    default:
      return state;
  }
};

const getMaps = (dispatch) => async () => {
  try {
    const response = await liveMapApi.get("/maps");
    dispatch({ type: GET_MAPS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_ERROR, payload: error });
  }
};

const createMap = (dispatch) => async (map) => {
  try {
    const response = await liveMapApi.post("/maps", { name: map.name });
    dispatch({ type: CREATE_MAP, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
export const { Provider, Context } = createDataContext(
  mapReducer,
  { getMaps, createMap },
  { maps: [] }
);
