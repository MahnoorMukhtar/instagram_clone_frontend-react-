import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from "../../actions/authActions";
import { connect } from "react-redux";
import classnames from "classnames";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user_name: '',
            password: '',
            error: {},
        };
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.auth.isAuthenticated) {
            return <Navigate to="/" />;
        }

        if(this.props.errors !== prevProps.errors)
        {
            this.setState({error: this.props.errors})
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value})
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted");
        this.props.loginUser(this.state.user_name, this.state.password)
    };

    render() {


        const { password, user_name, error} = this.state;
        if (this.props.auth.isAuthenticated) {
            return <Navigate to="/" />;
        }
        return (
            
            <section className="container">
                <div className="row mt-5">
                    <div className="col-md-5 m-auto">
                        <div className="border text-center p-4">
                            <h3 className="display-5">Instagram</h3>

                            <form className="my-4" onSubmit={this.handleSubmit}>
                                <div className="form-group mb-2">
                                    <input
                                        className={classnames('form-control', 'custom-input', {
                                            'is-invalid': error.user_name || error.non_field_error
                                        })}
                                        type="user_name"
                                        value={user_name}
                                        onChange={this.handleChange}
                                        name="user_name"
                                        placeholder="user_name" />
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        className={classnames('form-control custom-input', {
                                            'is-invalid': error.password || error.non_field_error
                                        })}
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        placeholder="Password" />
                                </div>

                                {error.detail ?
                                <p className="text-danger">{error.detail}</p>: null}
                                {error.non_field_errors ?
                                <p className="text-danger">{error.non_field_errors[0]}</p>: null}
                                {error.user_name ?
                                <p className="text-danger">{error.user_name[0]}</p>: null}
                                {error.password ?
                                <p className="text-danger">{error.password[0]}</p>: null}

                                <button className="btn btn-primary btn-block my-3">Login</button>
                            </form>
                        </div>
                        <div className="text-center border mt-4 p-2">
                            <small className="text-muted">Don't have an account?
                                <Link to="/signup" className="text-decoration-none" > Register</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


const mapStateToProp = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProp, { loginUser })(Login);
