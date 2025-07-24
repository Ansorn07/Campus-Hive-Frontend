import axios from "axios";

// ✅ Create Axios instance with cookie support
export const axiosInstance = axios.create({
  withCredentials: true,
  // baseURL: process.env.REACT_APP_BASE_URL, // Uncomment if using baseURL
});

// ✅ API Connector Function
export const apiConnector = async (
  method,
  url,
  bodyData = {},
  headers = {},
  params = {}
) => {
  try {
    // Log request details (optional for debugging)
    console.log("API Call:", {
      method,
      url,
      bodyData,
      headers,
      params,
    });

    const response = await axiosInstance({
      method,
      url,
      data: Object.keys(bodyData).length ? bodyData : undefined,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      params,
    });

    return response;
  } catch (error) {
    console.error("API Error:", error?.response?.data || error.message || error);
    throw error;
  }
};
