// import {
//     SINGLE_STUDENT_FAIL,
//     SINGLE_STUDENT_REQUEST,
//     SINGLE_STUDENT_SUCCESS,
//   } from "../../constant/user/userConstant";
import {
  SINGLE_IMAGE_SUCCESS,SINGLE_IMAGE_FAIL,SINGLE_IMAGE_REQUEST, SINGLE_USER_REQUEST, SINGLE_USER_SUCCESS, SINGLE_USER_FAIL, IMAGE_ML_DETAIL_REQUEST, IMAGE_ML_DETAIL_SUCCESS, IMAGE_ML_DETAIL_FAIL
} from "../constant/allConstant"
    
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

  export const userReducer = (state = {user : {}},action) => {
      switch (action.type){
        case SINGLE_USER_REQUEST : 
          return {loading : true,user : {}}
        case SINGLE_USER_SUCCESS : 
          return {loading : false,user : action.payload}
        case SINGLE_USER_FAIL :
          return {loading : false , error : action.payload}    
        default:
          return state  
      }
  }
  
  export const setImageDetailsReducer = (state = {imageDetails : null},action) => {
    switch (action.type){
      case SINGLE_IMAGE_REQUEST : 
        return {loading : true,imageDetails : null}
      case SINGLE_IMAGE_SUCCESS : 
        return {loading : false,imageDetails : action.payload}
      case SINGLE_IMAGE_FAIL :
        return {loading : false , error : action.payload}    
      default:
        return state  
    }
  }
  
  export const imageMlDetailsReducer = (state = {prediction : null},action) => {
    switch (action.type){
      case IMAGE_ML_DETAIL_REQUEST : 
        return {loading : true}
      case IMAGE_ML_DETAIL_SUCCESS : 
        return {loading : false,success : true,prediction : action.payload.result,orgResponse : action.payload.orgResponse }
      case IMAGE_ML_DETAIL_FAIL :
        return {loading : false,success : false,message : action.payload.message, error : action.payload.error}    
      default:
        return state  
    }
  }
  
  