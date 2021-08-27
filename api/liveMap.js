import axios from "axios";

let url = "http://localhost:4000/api/";

const liveMapApi = axios.create({
  baseURL: url,
});

export { liveMapApi };
