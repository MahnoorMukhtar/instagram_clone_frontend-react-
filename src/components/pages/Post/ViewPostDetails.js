import React from 'react';
import { viewPost, addComent, likePost, deletePost, deletePostFromList } from '../../../actions/postAction';
import {useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SinglePostDetail from './SinglePostDetail';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';

function ViewPostDetails() {

    const dispatch=useDispatch()
    const { id }=useParams()

    const [loading, setLoading] = useState(true); 

    const navigate=useNavigate()

    useEffect(() => {
        dispatch(viewPost(id))
        .then(() => setLoading(false))
        .catch((error) => {
            console.error('Error fetching user:', error);
            setLoading(false);
        });
        }, [dispatch, id]);
        
        const {user}= useSelector(state=>state.auth)
        const post= useSelector(state=>state.currentPost)

        if (loading) {
            return <p>Loading...</p>;
        }

        const redirectToProfile=()=>{
            navigate(`/profile/${user.user_name}`)
        }
        
        const displayPosts = post => (
            <div className=''>
                <div className='row'>
                <div className='col-2'>
                    <Sidebar/>
                </div>
                <div className='col-7'>
                    <SinglePostDetail
                        key={post.id}
                        post={post}
                        currentUser={user}
                        deletePost={(postId)=>dispatch(deletePost(postId))}
                        addComent={({post, message})=>dispatch(addComent({post, message}))}
                        likePost={(postId)=>dispatch(likePost(postId))}
                        deletePostFromList={(postId)=>dispatch(deletePostFromList(postId))}
                        showElements={ user ? true: false }
                        isPreview={true}
                    />
                </div>
                <div className='col-3'></div>
            </div>
            </div>
            
        )
    return ( 
        <div className=''>
                <div className='container'>
                    {user ? (post ? displayPosts(post) : redirectToProfile())
                        : navigate("/login")
                    }
                </div>
            </div>
    );
}

export default ViewPostDetails;