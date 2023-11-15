import { GET_ERROR } from "../actions/type";

const initialState={}
export const errorReducer=(state=initialState, action)=>
{
    console.log("inside error reducer", action.payload)
    switch (action.type){
        case GET_ERROR:
            return action.payload
        default:
            return state;
    }
}