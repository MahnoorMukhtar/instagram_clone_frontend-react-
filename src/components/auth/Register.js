import React from "react";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import classNames from "classnames";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            errors: '',
            user_name: '',
        };
    }
    


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const localErrors = {}; 
        if (this.state.first_name.trim() === "") {
            localErrors.first_name = "First name is required";
        }
        if (this.state.last_name.trim() === "") {
            localErrors.last_name = "Last name is required";
        }
        if (this.state.email.trim() === "") {
            localErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            localErrors.email = "Invalid email address";
        }
        if (this.state.password.length < 8) {
            localErrors.password = "Password must be at least 8 characters long";
        }

        if (Object.keys(localErrors).length > 0) {
            this.setState({ errors: localErrors }); 
        } else {
            // Handle form submission
            this.props.registerUser(
                this.state.first_name,
                this.state.last_name,
                this.state.email,
                this.state.password,
                this.state.user_name
            );
        }
    };

    render()
    {

    const { first_name, last_name, password, email, errors, user_name } = this.state
      
    return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group mb-2">
                    <input
                        className={classNames('form-control', 'custom-input', {
                            "is-invalid": errors.first_name
                        })}
                        type="text"
                        value={first_name}
                        onChange={this.handleChange}
                        name="first_name"
                        placeholder="First Name" />
                    {errors.first_name && (
                        <div className='invalid-feedback'>{errors.first_name}</div>
                    )}
                </div>
                <div className="form-group mb-2">
                    <input
                        className={classNames('form-control', 'custom-input', {
                            "is-invalid": errors.last_name
                        })}
                        type="text"
                        value={last_name}
                        onChange={this.handleChange}
                        name="last_name"
                        placeholder="Last Name" />
                    {errors.last_name && (
                        <div className='invalid-feedback'>{errors.last_name}</div>
                    )}
                </div>
                <div className="form-group mb-2">
                    <input
                        className={classNames('form-control', 'custom-input', {
                            'is-invalid': errors.user_name || errors.non_field_errors
                        })}
                        type="user_name"
                        value={user_name}
                        onChange={this.handleChange}
                        name="user_name"
                        placeholder="Username" />
                    {errors.user_name && (
                        <div className="invalid-feedback">{errors.user_name}</div>
                    )}
                    {errors.non_field_errors && (
                        <div className="invalid-feedback">
                            {errors.non_field_errors}
                        </div>
                    )}

                </div>
                <div className="form-group mb-2">
                    <input
                        className={classNames('form-control', 'custom-input', {
                            'is-invalid': errors.email || errors.non_field_errors
                        })}
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                        name="email"
                        placeholder="Email" />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                    {errors.non_field_errors && (
                        <div className="invalid-feedback">
                            {errors.non_field_errors}
                        </div>
                    )}

                </div>
                <div className="form-group mb-2">
                    <input
                        className={classNames('form-control custom-input', {
                            'is-invalid': errors.password || errors.non_field_errors
                        })}
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password" />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                        {errors.non_field_errors && (
                            <div className="invalid-feedback">
                                {errors.non_field_errors}
                            </div>
                        )}
                    <div style={{ color: "orange" }}>
                        Password should include a mix of uppercase, lowercase letters, numbers, special characters. Avoid common phrases.
                    </div>
                </div>
                <button className="btn btn-primary btn-block my-3">Register</button>
            </form>
        </div>        
    );
}
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register);
