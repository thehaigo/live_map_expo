import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
let url = "http://localhost:4000/api/";

const liveMapApi = axios.create({
  baseURL: url,
});

liveMapApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    let uuid = await AsyncStorage.getItem("uuid");
    if (!uuid) {
      uuid = uuidv4();
      await AsyncStorage.setItem("uuid", uuid);
    }
    if (token) {
      config.headers.Authorization = `Bearer: ${token}`;
      config.headers.UUID = uuid;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { liveMapApi };
