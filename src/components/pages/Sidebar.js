
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaHome, FaPlus } from "react-icons/fa";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class Sidebar extends React.Component {

    componentDidUpdate(prevProps) {
        
        if (!this.props.auth.user && prevProps.auth.user) {
            <Navigate to="/login" />;
        }
    }

    logout=()=>{
        this.props.logoutUser()
    }

    render() { 
        const {user}=this.props.auth;

        if(!user)
        {
            <Navigate to="/login"/>
        }


        return (    
            <div className="bg-dark" 
            style={{position: "fixed", top: "0", left:"0" , bottom: "0", width: "240px" }}>
            <div className="row flex-nowrap">
                <div className="col-md-8">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white  text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Instagram</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to="/" className="nav-link align-middle px-0">
                                    <FaHome/><span className="ms-1 d-none d-sm-inline">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/post/new" className="nav-link px-0 align-middle">
                                    <FaPlus/> <span className="ms-1 d-none d-sm-inline">Add Posts</span></Link>
                            </li>
                        </ul>
                        <hr/>
                        <div className="dropdown pb-4">
                            <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={user.profilePic} alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                                <span className="d-none d-sm-inline mx-1">{user.first_name}</span>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li>
                                    <Link className="dropdown-item" 
                                    to={`/profile/${user.user_name}`} >Profile</Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><Link className="dropdown-item" onClick={this.logout} to="">Sign out</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
        }
        }

const mapStateToProps=state=>{
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps,{logoutUser}) (Sidebar);      