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

export const imageMlDataAction = (id, task) => async (dispatch) => {
  try {
    dispatch({ type: IMAGE_ML_DETAIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    // const token = await Cookies.get("token");
    const response = await axios.post(`/api/v1/ml/${task}/${id}`, config);
    console.log(response.data);
    dispatch({ type: IMAGE_ML_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: IMAGE_ML_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
