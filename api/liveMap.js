import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
let url = "http://localhost:4000/api/";

const liveMapApi = axios.create({
  baseURL: url,
});

liveMapApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer: ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { liveMapApi };
