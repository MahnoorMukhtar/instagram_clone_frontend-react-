import React from "react";
import Sidebar from "./Sidebar";
import PostArea from "./Post/PostArea";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
class Welcome extends React.Component {
    state = {  } 
    


    render() { 
        const {isAuthenticated}=this.props.auth
        console.log("isAuthenticated", isAuthenticated)

        const {user}=this.props.auth
        console.log("user", user)
        
        
        if (!isAuthenticated) 
            return <Navigate to="/login" />;
        return (
            <div className="">
                <div className="row">
                    <div className="col-3" >
                        <Sidebar/>
                    </div>
                    <div className="col-6">
                        <PostArea/>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProp=state=>{
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProp)(Welcome);