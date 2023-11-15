import { SET_CURRENT_USER, GET_ERROR} from "./type";

import axios from "axios";

export const fetchUserFromToken = (access_token) => async (dispatch) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = 
        await 
        axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me/`, config);
        dispatch(setCurrentUser(response.data))
    
    } catch (err) {
        console.log("error",err.response.data)
        dispatch({
        type: GET_ERROR,
        payload: err,
        });
    }
    };


export const loginUser = (user_name, password) => (dispatch) => {
    
    const data = {user_name,password};
    axios
    .post(`${process.env.REACT_APP_API_URL}/api/token/`, data)

    .then(response => {
        const access_token  =  response.data.access;
        const refresh_token  =  response.data.refresh;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        dispatch(fetchUserFromToken(access_token))
        
    })
    .catch((err) => {
        console.log(err)
        dispatch({
        type: GET_ERROR,
        payload: err.response ? err.response.data : err.message
        });
    });
};


export const logoutUser=()=>(dispatch)=>{

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    dispatch(setCurrentUser())
}


export const refreshToken=()=>async dispatch=>{
    try{
        let refresh_token=localStorage.getItem("refresh_token")
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/token/refresh/`,
        {
            "refresh": refresh_token
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status===200){
            let access_token=response.data.access
            localStorage.setItem("access_token", access_token)
            dispatch(fetchUserFromToken(access_token))
            
        }
    }catch(error){
        console.log(error)
        dispatch({
            type: GET_ERROR,
            payload: error.response ? error.response.data :  error.message
        })
    }

}

export const setCurrentUser=decodedVal=>dispatch=>{

        dispatch({
            type: SET_CURRENT_USER,
            payload: decodedVal
        })
};

    

export const registerUser=(first_name, last_name, email, password, user_name)=>(dispatch) => {
    
    const body = {first_name,last_name,email,password, user_name}
    axios
        .post( `${process.env.REACT_APP_API_URL}/api/auth/register/`, body)
        .then(res => {
            window.location.href = '/login'
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({
            type: GET_ERROR,
            payload: err.response.data
            });
        });
    };