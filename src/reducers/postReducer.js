import { ADD_COMMENT, 
    ADD_POST, DELETE_POST, 
    FETCH_POST, TOGGLE_LIKE_POST, 
    VIEW_POST, DELETE_POST_FROM_LIST } from "../actions/type";


export const postReducer=(posts=[], action)=>{

    switch(action.type){    
        case FETCH_POST:
            return action.payload
        
        case ADD_COMMENT:
            return posts.map(post=>{    
                if(post.id===action.payload.post){
                    post.comment.push(action.payload)
                }
                return post
            }
                )
        case DELETE_POST_FROM_LIST:
            return posts.filter((post) => post.id !== action.payload);

        case TOGGLE_LIKE_POST:
            return posts.map(post =>{
                if(post.id === action.payload.postId){
                    post.is_liked = !post.is_liked
                    post.likes=post.is_liked ? post.likes+1 : post.likes-1 
                }
                return post;
            })
        
        default:
            return posts
    }
}

export const viewPostReducer=(currentPost=null, action)=>{

    let currentPostCopy=currentPost === null ? null : {...currentPost}

    switch(action.type){
        case VIEW_POST:
            return action.payload
        
        case ADD_POST:
            currentPostCopy = action.payload
            break;
        
        case ADD_COMMENT:
            if (currentPost !== null && currentPost.id === action.payload.post) {
                currentPostCopy.comment.push(action.payload)
            }
            break;
        
        case DELETE_POST:
            if (currentPost !== null && currentPost.id === action.payload) {
                return null;
            }
            return currentPost;
        
        case TOGGLE_LIKE_POST:
            
            if(currentPost !== null && currentPost.id === action.payload.postId)
            {
                currentPostCopy.is_liked = !currentPostCopy.is_liked
                currentPostCopy.likes=currentPostCopy.is_liked ? currentPostCopy.likes+1 :
                                                                currentPostCopy.likes -1
            }
            break;
        default: 
            return currentPostCopy
    }
    currentPost=currentPostCopy
    return currentPost;

}