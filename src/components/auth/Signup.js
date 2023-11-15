import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Register from './Register';

class Home extends Component {
    render() {
    return (
        <div className='container'>
        <div className='row mt-5'>
            <div className='col-md-5 m-auto'>
                <div className='border text-center bg-white py-3 px-4'>
                    <h2>Instagram</h2>
                    <h5 className='font-weight-bold text-muted mt-4'>Sign up to see photos and videso of your friends</h5>
                        <Register/>
                    <small>By signing up you agree to out tearms and conditions</small>
                </div>
                <div className='border bg-white text-center mt-4'>
                    <p className='mt-4'>Already have an account?
                        <Link to="/login" className='text-decoration-none' > Login here</Link>.
                    </p>
                </div>
            </div>
        </div> 
    </div>

    );
    }
}

export default Home;
