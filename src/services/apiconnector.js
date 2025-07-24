// import axios from "axios";

// // Axios instance with optional baseURL
// export const axiosInstance = axios.create({
//   // baseURL: process.env.REACT_APP_BASE_URL, // Uncomment if needed
//   withCredentials: true, // Enable cookie support
// });

// export const apiConnector = async (
//   method,
//   url,
//   bodyData = {},
//   headers = {},
//   params = {}
// ) => {
//   try {
//     // ✅ Log API call parameters for debugging
//     console.log("Making API call:", {
//       method,
//       url,
//       bodyData,
//       headers,
//       params,
//     });

//     const response = await axiosInstance({
//       method,
//       url,
//       data: Object.keys(bodyData).length ? bodyData : undefined,
//       headers: {
//         "Content-Type": "application/json", // Important for most POST requests
//         ...headers,
//       },
//       params,
//     });

//     return response;
//   } catch (error) {
//     console.error("API Error:", error?.response?.data || error.message || error);
//     throw error;
//   }
// };

import axios from "axios";

// ✅ Axios instance with cookie support
export const axiosInstance = axios.create({
  withCredentials: true, // Important for auth cookies
  // baseURL: process.env.REACT_APP_BACKEND_URL, // Optional: uncomment if using
});

// ✅ Main API connector function
export const apiConnector = async (
  method,
  url,
  bodyData = {},
  headers = {},
  params = {}
) => {
  try {
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
