// import {
//     SINGLE_STUDENT_FAIL,
//     SINGLE_STUDENT_REQUEST,
//     SINGLE_STUDENT_SUCCESS,
//   } from "../../constant/user/userConstant";
import { imageMlDataAction } from "../actions/allAction";
import {
  SINGLE_IMAGE_SUCCESS,
  SINGLE_IMAGE_FAIL,
  SINGLE_IMAGE_REQUEST,
  SINGLE_USER_REQUEST,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_FAIL,
  // IMAGE_ML_DETAIL_REQUEST,
  // IMAGE_ML_DETAIL_SUCCESS,
  // IMAGE_ML_DETAIL_FAIL,
} from "../constant/allConstant";

// export const singleStudentDetailsReducer = (state = {studentDetail : {}},action) => {
//     switch (action.type){
//       case SINGLE_STUDENT_REQUEST :
//         return {loading : true,studentDetail : {}}
//       case SINGLE_STUDENT_SUCCESS :
//         return {loading : false,studentDetail : action.payload.student}
//       case SINGLE_STUDENT_FAIL :
//         return {loading : false , error : action.payload}
//       default:
//         return state
//     }
// }

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SINGLE_USER_REQUEST:
      return { loading: true, user: {} };
    case SINGLE_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case SINGLE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setImageDetailsReducer = (
  state = { imageDetails: null },
  action
) => {
  switch (action.type) {
    case SINGLE_IMAGE_REQUEST:
      return { loading: true, imageDetails: null };
    case SINGLE_IMAGE_SUCCESS:
      return { loading: false, imageDetails: action.payload };
    case SINGLE_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const imageMlDetailsReducer = (
  state = {
    prediction: null,
    loading: false,
    success: false,
    error: null,
    message: null,
    orgResponse: null,
  },
  action
) => {
  switch (action.type) {
    case IMAGE_ML_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
        message: null,
      };

    case IMAGE_ML_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        message: null,
        prediction: action.payload.result,
        orgResponse: action.payload.orgResponse,
        fullResponse: action.payload.fullResponse,
      };

    case IMAGE_ML_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        prediction: null,
        orgResponse: null,
        error: action.payload.error || action.payload.message,
        message: action.payload.message,
        errorCode: action.payload.code,
      };

    case IMAGE_ML_DETAIL_RESET: // Optional reset action
      return {
        prediction: null,
        loading: false,
        success: false,
        error: null,
        message: null,
        orgResponse: null,
      };

    default:
      return state;
  }
};

// Optional: Action to reset the state
export const resetImageMlData = () => ({
  type: IMAGE_ML_DETAIL_RESET,
});

// Action Types (make sure these are defined in your constants file)
export const IMAGE_ML_DETAIL_REQUEST = "IMAGE_ML_DETAIL_REQUEST";
export const IMAGE_ML_DETAIL_SUCCESS = "IMAGE_ML_DETAIL_SUCCESS";
export const IMAGE_ML_DETAIL_FAIL = "IMAGE_ML_DETAIL_FAIL";
export const IMAGE_ML_DETAIL_RESET = "IMAGE_ML_DETAIL_RESET";

// Enhanced version with retry logic
export const imageMlDataActionWithRetry =
  (id, task, retryCount = 0, maxRetries = 3) =>
  async (dispatch) => {
    try {
      await dispatch(imageMlDataAction(id, task));
    } catch (error) {
      if (retryCount < maxRetries && error.response?.status >= 500) {
        // Retry on server errors
        console.log(`Retrying API call (${retryCount + 1}/${maxRetries})...`);
        setTimeout(() => {
          dispatch(
            imageMlDataActionWithRetry(id, task, retryCount + 1, maxRetries)
          );
        }, 1000 * (retryCount + 1)); // Exponential backoff
      } else {
        // Don't retry, let the error propagate
        throw error;
      }
    }
  };

// Usage example in component:
/*
const handleRetry = () => {
  dispatch(resetImageMlData()); // Clear previous state
  dispatch(imageMlDataAction(imageId, task));
};

// Or with retry logic:
const handleRetryWithBackoff = () => {
  dispatch(resetImageMlData());
  dispatch(imageMlDataActionWithRetry(imageId, task));
};
*/
