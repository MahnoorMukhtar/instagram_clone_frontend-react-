import {ADD_COMMENT, 
        FETCH_POST, 
        GET_ERROR, 
        VIEW_POST, 
        ADD_POST,
        TOGGLE_LIKE_POST, 
        DELETE_POST, 
        DELETE_POST_FROM_LIST} 
        from "./type";

import handleHeader from "../utils/handleHeader";


export const fetchPost = () => async (dispatch) => {
    try {
        const response = await handleHeader.get('/api/insta/post/');
        dispatch({
            type: FETCH_POST,
            payload: response.data
        });
    } catch (err) {
        console.log('Fetch Posts Error:', err);
        dispatch({
            type: GET_ERROR,
            payload: err.response ? err.response.data : err.message
        });
    }
};

export const viewPost=(postId)=>async(dispatch)=>{

    try{
        const response=await handleHeader.get(`api/insta/post/${postId}/`);
            dispatch({
                type:VIEW_POST,
                payload:response.data
            })
    }catch(err){
        console.log("view post error", err)
        dispatch({
            type:GET_ERROR,
            payload:err.response ? err.response.data : err.message 
        })
}
}


export const likePost=(postId)=>async(dispatch)=>{
    try{
        await handleHeader.post(`/api/insta/like/${postId}/`)
            dispatch({
                type:TOGGLE_LIKE_POST,
                payload:{postId}
            })
        }catch(error)
        {
            console.log("like post error", error)
            dispatch({
                type:GET_ERROR,
                payload:error.response ? error.response.data : error.message
            })
        }
}

export const addComent=({post, message})=>async(dispatch)=>{

    try{
        const response=await handleHeader.post('/api/insta/comment/',{post, message})
        console.log("comment action", response.data)
            dispatch({
                type:ADD_COMMENT,
                payload:response.data
            })
    }catch(error)
    {
        console.log("add comment error", error)
        dispatch({
            type:GET_ERROR,
            payload: error.res ? error.res.data : error.message 
        })
    } 
}

export const addPost=({Image, caption})=> async(dispatch)=>{
 
    try{
    const postData = new FormData();
    postData.append('image', Image)
    postData.append('caption', caption)

    console.log("postData", postData)
    
    const response=await handleHeader.post('/api/insta/post/', postData,{
        headers:{
            'Content-Type':'multipart/form-data'   //for file uploads
        }
    })
        dispatch({
            type: ADD_POST,
            payload: response.data
            })
    }
    catch(error){
        console.log("error", error)
        dispatch({
            type: GET_ERROR,
            payload: error.response ? error.response.data : error.message
        })
    }

}


export const deletePost=(postId)=>async dispatch=>{

    try{
        await handleHeader.delete(`/api/insta/post/${postId}`)
        dispatch({
            type: DELETE_POST,
            payload: postId
        })

    }catch(error)
    {
        console.log('error', error);
        dispatch({
            type: GET_ERROR,
            payload: error.response? error.response.data : error.message
    })
}
}

export const deletePostFromList = (postId) => {
    return {
        type: DELETE_POST_FROM_LIST,
        payload: postId,
    };
};