import { createStore } from "redux";
import thunk from "redux-thunk";
// import {
//   singleStudentDetailsReducer,
//   userLoginReducers,
// } from "./Redux/reducers/userReducer";
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  imageMlDetailsReducer,
  setImageDetailsReducer,
  userReducer,
} from "./Redux/reducers/allReducers";

const loginFromStorge = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const rootReducer = combineReducers({
  userDetail: userReducer,
  // getSingleStudent: singleStudentDetailsReducer,
  getImage: setImageDetailsReducer,
  imgMlInfo : imageMlDetailsReducer
});

const initialState = {
  userDetail: {user : loginFromStorge},
};

// const initialState = {
//   userLogin: { userLoginDetails: loginFromStorge },
// };

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
