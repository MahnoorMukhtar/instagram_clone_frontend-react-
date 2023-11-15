import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { errorReducer } from "./errorReducer";
import { postReducer, viewPostReducer } from "./postReducer";
import { profileReducer } from "./profileReducer";

export default combineReducers({
    auth:authReducer,
    errors: errorReducer,
    posts: postReducer,
    currentPost: viewPostReducer,
    profile: profileReducer,
});