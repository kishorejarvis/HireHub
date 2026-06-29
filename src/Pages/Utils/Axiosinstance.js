import axios from "axios";

// Single axios instance for the whole app.
// Backend integration will be enabled by:
//  - setting REACT_APP_API_BASE_URL / VITE_API_BASE_URL
//  - returning a JWT token from auth endpoints
//  - storing token via Authcontext
const apiBaseUrl =
  import.meta?.env?.VITE_API_BASE_URL ||
  import.meta?.env?.REACT_APP_API_BASE_URL ||
  "";

const Axiosinstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axiosinstance;

