import axios from "axios";

let backends = {
  development: "http://localhost:8000/api",
  production: "https://humane-blindly-gazelle.ngrok-free.app/api",
};

const api = axios.create({ baseURL: backends[process.env.NODE_ENV] });
api.defaults.headers['ngrok-skip-browser-warning']='true';
export default api;