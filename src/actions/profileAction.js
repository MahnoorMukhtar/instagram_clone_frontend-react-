import handleHeader from "../utils/handleHeader"
import { EDIT_PROFILE, FETCH_USER, GET_ERROR } from "./type"
import axios from "axios"

export const fetchUser=(user_name)=>async(dispatch)=>{
    try{
        const response=await handleHeader.get(`api/auth/users/${user_name}`)
        dispatch({
            type: FETCH_USER,
            payload: response.data
        })
    }catch(error)
    {
        console.log("error in fetch user", error)
        dispatch({
            type: GET_ERROR,
            payload: error.response? error.response.data :error.message
        })
    }
}

export const UpdateProfile=(userId, bio, profilePic, first_name, last_name)=> async(dispatch)=>{

    const access_token = localStorage.getItem("access_token");
    
        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('profilePic', profilePic);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('id', userId);

        try{
        axios.patch('http://localhost:8000/api/auth/update-profile/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access_token}`, 
            },
        }).then(res=>{
            console.log("response", res.data)
            dispatch({
                type: EDIT_PROFILE,
                payload: res.data
                    })
        })  
        }catch(error)
        {
            console.log(error)
            dispatch({
                type:GET_ERROR,
                payload: error.response ? error.response.data : error.message
            })
        }
        
}