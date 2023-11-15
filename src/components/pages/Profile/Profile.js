import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { fetchUser } from '../../../actions/profileAction';
import Sidebar from '../Sidebar';
import MyModal from './MyModel';

function Profile() {

    const dispatch=useDispatch()
    const {user_name}= useParams()
    const [loading, setLoading] = useState(true); 
    
    const user=useSelector(state=>state.profile)
    const loggedInUser=useSelector(state=>state.auth.user)

    
    useEffect(() => {
            dispatch(fetchUser(user_name))
                .then(() => setLoading(false))
                .catch((error) => {
                    console.error('Error fetching user:', error);
                    setLoading(false);
                });

    }, [dispatch, user_name]);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>User not found</p>;
    }
    return ( 
            <div className='profilePage'>
                {loggedInUser ? (
                    <div className='row'>
                    <div className='col-3'><Sidebar/></div>
                    <div className='col-9 mt-5'>
                    <div className='row'>
                        <div className='col-3 m-2'>
                            <img
                            className='rounded-circle cursor-pointer'
                            src={user.profilePic}
                            height="120"
                            width="120"
                            alt="user's profile pic"
                            />
                        </div>
                        <div className='col-8'>
                            <div className='fs-4'>
                                {user.user_name}
                                {user.id === loggedInUser.id && <button onClick={openModal} className='btn-btn-info mx-4 fs-6 border-1 rounded-3'>Edit Profile</button>}
                                
                            </div>
                            <div className='d-flex m-3'>
                                <span className='fw-bold me-2'>{user.num_of_posts}</span>posts
                                <span className='fw-bold mx-2'>{user.num_of_followers}</span> followers
                                <span className='fw-bold mx-2'>{user.num_of_following}</span> following
                            </div>
                            <div className='fw-bold'>{user.first_name} {user.last_name}</div>
                            <div>{user.bio}</div>
                        </div>
                    </div>
                    <hr className='mt-5'/>
                    <div>
                        <h6>Posts</h6>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                        {user.post && user.post.length>0 ?  (user.post.map((p) => (
                            <div className="col" key={p.id}>
                                <div className="card">
                                    <Link to={`/post/${p.id}`}>
                                        <img
                                        src={p.image}
                                        width="300"
                                        height="280"
                                        className="card-img-top"
                                        alt={`Post ${p.id}`}
                                        />
                                    </Link>
                                </div>
                            </div>
                        )))
                        : (<h3 className='container mt-5'>No posts yet</h3>) }
                        </div>
                        </div>
                </div>
                </div>
                ): (<Navigate to="/login"/>)}
                {user.id}
                {user && showModal && <MyModal user={user} show={showModal} handleClose={closeModal} userId={user.id} />}

            </div> 
    );
}

export default Profile;