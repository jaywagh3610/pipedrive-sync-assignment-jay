import axios from "axios";

export const apiErrorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.error ||
        error.response.data?.message ||
        "something went wrong";

      console.error(`APIError[${status}]:${message}`);

      return {
        status,
        message,
        data: error.response.data,
      };
    }
    if (error.request) {
      console.error("Network Error");
      return {
        status: 0,
        message: "Network error. Please try agian.",
      };
    }
  }
  console.error("Unexpected Error:", error);
  return {
    status: 500,
    message: "Unexpected error occurred",
  };
};
