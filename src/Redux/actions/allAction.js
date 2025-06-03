import axios from "axios";

import {
  IMAGE_ML_DETAIL_FAIL,
  IMAGE_ML_DETAIL_REQUEST,
  IMAGE_ML_DETAIL_SUCCESS,
  SINGLE_USER_FAIL,
  SINGLE_USER_REQUEST,
  SINGLE_USER_SUCCESS,
} from "../constant/allConstant";
import {
  SINGLE_IMAGE_FAIL,
  SINGLE_IMAGE_REQUEST,
  SINGLE_IMAGE_SUCCESS,
} from "../constant/allConstant";

// export const studentloginAction = (rollNo, password) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOGIN_REQUEST });

//     const config = { headers: { "Content-Type" : "application/json" } };

//     const {data} = await axios.post(
//       "/api/student/login",
//       { rollNo, password },
//       config
//     );
//     data.user.isHod = data.isHod;
//     // console.log(data);
//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });

//     localStorage.setItem("userLogin", JSON.stringify(data.user));
//   } catch (error) {
//     // console.log(error);
//     // console.log()
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//       error.response && error.response.data.message
//       ? error.response.data.message
//       : error.message,
//     });
//   }
// };

// export const logOutAction = () => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOGOUT_REQUEST });
//     await axios.get('/api/student/logout');
//     localStorage.setItem("userLogin",null);
//     localStorage.removeItem('userLogin');
//     dispatch({ type: USER_LOGOUT_SUCCESS});
//   } catch (error) {
//     // console.log(error);
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const setImageDetail = (base64) => async(dispatch) => {
//   try {
//     dispatch({type : SINGLE_IMAGE_REQUEST});

//     // console.log(id);

//     // const config = { headers: { "Content-Type" : "application/json" } };

//     // const {data} = await axios.get(`/api/student/${id}`,config);
//     // console.log(data);
//     dispatch({type : SINGLE_IMAGE_SUCCESS , payload : base64 });

//   } catch (error) {
//     dispatch({
//       type: SINGLE_IMAGE_FAIL,
//       payload: "Sucess Failed"
//     });
//   }
// }
export const setImageDetail = (base64) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_IMAGE_REQUEST });

    // console.log(id);

    // const config = { headers: { "Content-Type" : "application/json" } };

    // const {data} = await axios.get(`/api/test/message1`,config);
    // console.log("dawdiwauhdiawhidhwaiu"+data);
    dispatch({ type: SINGLE_IMAGE_SUCCESS, payload: base64 });
  } catch (error) {
    dispatch({
      type: SINGLE_IMAGE_FAIL,
      payload: "Sucess Failed",
    });
  }
};

export const checkUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getIte,
      },
    };
    // const token = await Cookies.get("token");
    const response = await axios.post(
      "/api/v1/user/check",
      {
        // token: token,
      },
      config
    );
    console.log(response.data);
    // Cookies.set("token", response.data.token, {
    //   expires: 500,
    //   secure: true,
    //   sameSite: "Lax",
    dispatch({ type: SINGLE_USER_SUCCESS, payload: response.data.user });
    // });
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  } catch (error) {
    // console.log(error);
    // console.log()
    dispatch({
      type: SINGLE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Redux Action - Fixed Version
export const imageMlDataAction = (id, task) => async (dispatch) => {
  try {
    // Reset any previous errors
    dispatch({ type: IMAGE_ML_DETAIL_REQUEST });

    // Get token and clean it (remove extra quotes if present)
    let token = localStorage.getItem("token");
    if (token) {
      // Remove extra quotes if they exist
      token = token.replace(/^["']|["']$/g, "");
    }

    // Validate required parameters
    if (!id || !task) {
      throw new Error("Missing required parameters: id and task are required");
    }

    if (!token) {
      throw new Error("Authentication token not found. Please login again.");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000, // 30 second timeout
    };

    console.log(`Making ML API call: ${task}/${id}`);

    // Fixed: config should be the third parameter, not request body
    const response = await axios.post(
      `http://localhost:6969/api/v1/ml/${task}/${id}`,
      {}, // Empty request body (or add data if needed)
      config // Configuration as third parameter
    );

    console.log("ML API Response:", response.data);

    // Check if response has expected structure
    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    dispatch({
      type: IMAGE_ML_DETAIL_SUCCESS,
      payload: {
        result: response.data.result || response.data.prediction || null,
        orgResponse: response.data.orgResponse || response.data.message || null,
        fullResponse: response.data,
      },
    });
  } catch (error) {
    console.error("ML API Error:", error);

    let errorMessage = "An unexpected error occurred";
    let errorCode = null;

    if (error.response) {
      // Server responded with error status
      errorCode = error.response.status;

      switch (errorCode) {
        case 401:
          errorMessage = "Authentication failed. Please login again.";
          // Optionally clear token and redirect to login
          localStorage.removeItem("token");
          break;
        case 403:
          errorMessage =
            "Access denied. You don't have permission to perform this action.";
          break;
        case 404:
          errorMessage = "The requested resource was not found.";
          break;
        case 422:
          errorMessage = "Invalid data provided. Please check your input.";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage =
            error.response.data?.message ||
            error.response.data?.error ||
            `Server error (${errorCode})`;
      }
    } else if (error.request) {
      // Network error
      errorMessage =
        "Network error. Please check your connection and try again.";
    } else {
      // Other error
      errorMessage = error.message || errorMessage;
    }

    dispatch({
      type: IMAGE_ML_DETAIL_FAIL,
      payload: {
        message: errorMessage,
        error: errorMessage,
        code: errorCode,
        fullError: error,
      },
    });
  }
};
