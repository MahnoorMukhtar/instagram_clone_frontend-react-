import { SET_CURRENT_USER } from "../actions/type";
  
  const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
const isEmpty=(val)=>{
  return(
    val===null || val===undefined ||
    (typeof val==="object" && Object.keys(val).length===0)
    || (typeof val==="string" && val.trim().length===0 )
  )
}
  export default function(state=initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
          return{
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
          }
        default:
          return state;
    }
  }

  