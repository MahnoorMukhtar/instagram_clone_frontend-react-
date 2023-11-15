import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import {FaHeart } from 'react-icons/fa';
import { IoIosArrowUp, IoIosChatboxes } from 'react-icons/io';

class PostListItem extends Component {
    
    render() { 
        const {post, showElements, currentUser, isPreview}=this.props
        console.log("post caption", post.caption)
        console.log("ispreview", isPreview)

        const showCompComm = ({ id, caption }) => (
            <span>
                {caption.length > 100 ? caption.slice(0, 100) + '...' : caption}
                <Link className='text-decoration-none' to={`post/${id}`}>
                    View full Caption
                </Link>
                </span>
            );
        const showPostfooter=(user, post)=>(
            <div className='d-flex align-items-center mt-3 g-3'>
                <FaHeart size={23} 
                onClick={()=>{this.props.likePost(post.id)}}
                style={post.is_liked ? {color: 'red'} : {color: ""}}
                />

                <IoIosChatboxes size={23}
                onClick={() => {
                    document.getElementById(`comment-field${post.id}`).focus();
                }}
                />
                <IoIosArrowUp size={23}/>
            </div>
            
        );
        return (
            
            <div className='card border-0'>
                <div className='card-body'>
                    <Link className="card-subtitle text-decoration-none text-dark fw-normal float-end" 
                    to={`/post/${post.id}`}>
                        {post.time_passed}
                    </Link>
                    <Link className='card-subtitle text-decoration-none text-dark fw-normal d-flex align-items-center text-decoration-none' to={`/profile/${post.author.user_name}`}>
                        <img
                        className='rounded-circle'
                        width="30" height="30"
                        src={post.author.profilePic}
                        alt="profile pic"
                        />
                        <div className='d-none d-sm-inline mx-1'>
                            {post.author.user_name}.
                        </div>
                    </Link>
                </div>
                <img
                src={post.image}
                alt={post.caption}
                className='card-img-top'
                />
                {showElements ? showPostfooter(currentUser, post) : null}
                <div className='card border-0'>
                        <div className='card-subtitle my-2'>
                            {post.likes} likes
                        </div>
                        <p className='d-flex text-decoration-none'>
                            <Link to={`/profile/${post.author.user_name}`} className='text-dark fw-bold text-decoration-none mx-2'>
                                {post.author.user_name}
                            </Link>
                            {post.caption && post.caption.length > 100 && isPreview ? showCompComm(post) : post.caption}
                        </p>
                        {post.comment.length > 0 ? <hr/> : null}
                        {post.comment.map((com,index)=>{
                            return isPreview && index > 2 ? null :
                            (
                                <p key={index}>
                                    <Link className='card-subtitle text-dark fw-bold mx-2 text-decoration-none' to={`/profile/${com.author.user_name}`}>
                                        {com.author.user_name}
                                    </Link>
                                    {com.message}
                                </p>
                            )
                        })}
                        {isPreview && post.comment.length> 3 ? (
                            <Link to={`/post/${post.id}`}>
                            View All Comments
                            </Link>
                        )
                        : null }
                    </div>
                    {showElements ? 
                    <Comments
                        post={post}
                        addComment={this.props.addComent}
                        elId={`comment-field${post.id}`}
                    /> : null}
                    <hr/>
                </div>


            );
    }
}

export default PostListItem;