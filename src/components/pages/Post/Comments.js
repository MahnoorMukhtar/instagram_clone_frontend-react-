import { Formik, Form } from 'formik';
import React, { Component } from 'react';

class Comments extends Component {
    render() { 
        return ( 
        <div className='comment form'>
            <Formik
            initialValues={{
                message:"",
                post: this.props.post.id
            }}
            onSubmit={(values, {resetForm})=>{
                this.props.addComment(values).then(response=>{
                    resetForm();
                    values.message=""
                })
            }}>
                {({values, isSubmitting, handleChange})=>(
                    <Form className={isSubmitting ? "loading" : "form" }>
                        <div className='row'>
                        <div className='form-input col'>
                            <input
                            className='form-control border-0'
                            type='text'
                            name="message"
                            placeholder='Add a comment...'
                            value={values.message}
                            onChange={handleChange}
                            />
                        </div>
                        <div className='col-auto'>
                            <button className='btn' type='submit' >Post</button>
                        </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div> );
    }
}

export default Comments;