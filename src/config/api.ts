import axios from "axios";
import { PIPEDRIVE_API_KEY, PIPEDRIVE_COMPANY_DOMAIN } from "../config/env";
import { apiErrorHandler } from "../utils/errorHandler";

const api = axios.create({
  baseURL: `https://${PIPEDRIVE_COMPANY_DOMAIN}.pipedrive.com/api`,
  timeout: 5000,
  params: {
    api_token: PIPEDRIVE_API_KEY,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = apiErrorHandler(error);

    return Promise.reject(formattedError);
  },
);
export default api;
