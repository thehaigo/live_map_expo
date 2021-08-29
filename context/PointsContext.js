import { liveMapApi } from "../api/liveMap";
import createDataContext from "./createDataContext";

const CREATE_POINT = "CREATE_POINT";
const GET_POINTS = "GET_POINTS";

const pointsReducer = (state, action) => {
  switch (action.type) {
    case CREATE_POINT:
      return { ...state, points: [...state.points, action.payload] };
    case GET_POINTS:
      return { ...state, points: action.payload };
    default:
      return state;
  }
};

const getPoints = (dispatch) => async (map) => {
  try {
    const response = await liveMapApi.get("/spots", {
      params: { map_id: map.id },
    });
    dispatch({ type: GET_POINTS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const createPoint = (dispatch) => async (params) => {
  try {
    const response = await liveMapApi.post("/points", params);
    dispatch({ type: CREATE_POINT, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  pointsReducer,
  { getPoints, createPoint },
  { points: [] }
);
