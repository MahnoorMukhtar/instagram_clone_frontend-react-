import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import { FaHeart } from 'react-icons/fa';
import { IoIosArrowUp, IoIosChatboxes } from 'react-icons/io';

class SinglePostDetail extends Component {
    render() {
        const { post, showElements, currentUser, deletePost, deletePostFromList } = this.props;

        if (!post || !post.author) {
            return null;
        }

        const handleDelete = () => {
            deletePost(post.id);
            deletePostFromList(post.id);
        };

        const showPostFooter = (user, post) => (
            <div className='d-flex align-items-center m-3'>
                <FaHeart
                    size={23}
                    onClick={() => {
                        this.props.likePost(post.id);
                    }}
                    style={post.is_liked ? { color: 'red' } : { color: '' }}
                />
                <IoIosChatboxes
                    size={23}
                    onClick={() => {
                        document.getElementById(`comment-field${post.id}`).focus();
                    }}
                />
                <IoIosArrowUp size={23} />
            </div>
        );

        return (
            <div className='card border-0'>
                <div className='card-body'>
                    <p className="card-subtitle d-flex align-items-center justify-content-end text-decoration-none text-dark fw-normal float-end">
                        {currentUser && currentUser.user_name === post.author.user_name && (
                            <div className="ms-auto">
                                <button
                                    className='btn btn-light text-danger fw-bold'
                                    onClick={handleDelete}
                                >
                                    Delete Post
                                </button>
                            </div>
                        )}
                        <span className='mt-2 ms-2'>{post.time_passed}</span>
                    </p>
                    <Link
                        className='card-subtitle text-decoration-none text-dark fw-normal d-flex align-items-center text-decoration-none'
                        to={`/profile/${post.author.user_name}`}
                    >
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
                {showElements ? showPostFooter(currentUser, post) : null}
                <div className='card border-0'>
                    <div className='card-subtitle my-2'>
                        {post.likes} likes
                    </div>
                    <p className='d-flex text-decoration-none'>
                        <Link
                            to={`/profile/${post.author.user_name}`}
                            className='text-dark fw-bold text-decoration-none mx-2'
                        >
                            {post.author.user_name}
                        </Link>
                        {post.caption}
                    </p>
                    {post.comment.length > 0 ? <hr /> : null}
                    {post.comment.map((com, index) => {
                        return (
                            <p key={index}>
                                <Link
                                    className='card-subtitle text-dark fw-bold mx-2 text-decoration-none'
                                    to={`/profile/${com.author.user_name}`}
                                >
                                    {com.author.user_name}
                                </Link>
                                {com.message}
                            </p>
                        );
                    })}
                </div>
                {showElements ?
                    <Comments
                        post={post}
                        addComment={this.props.addComent}
                        elId={`comment-field${post.id}`}
                    /> : null}
                <hr />
            </div>
        );
    }
}

export default SinglePostDetail
