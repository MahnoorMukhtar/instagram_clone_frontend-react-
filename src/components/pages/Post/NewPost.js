import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Formik, Form} from 'formik';
import { addPost } from '../../../actions/postAction';
import { connect } from 'react-redux';


class Thumb extends Component {
    state = { 
        previewFile: undefined,
        loading: false,
        rawFile: null
    }

    componentDidUpdate(prevProps)
    {
        if(!prevProps.files || prevProps.files === this.state.rawFile )
        {
            return
        }

        this.setState({
            loading: true, rawFile: prevProps.files
        },()=>{
            let reader=new FileReader()
            reader.onloadend=()=>{
                this.setState({loading: false, previewFile:reader.result})
            }
            reader.readAsDataURL(prevProps.files);
        })
    }


    render() { 
        const {files}=this.props
        const {loading, previewFile}=this.state

        if(!files)
        {
            return null
        }

        if(loading)
        {
            return <p>Loading....</p>
        }
        return ( 
            <div>
                <div className='h6'>
                    Preview
                </div>
                <img 
                src={previewFile} 
                alt={files.name} className='image-fluid rounded' />
            </div>
        );
    }
}

class NewPost extends Component {
    state = { 
        postsHere: null
        }

    render() { 
        const {user}=this.props.auth
        if(user===null)
        {
            return <Navigate to="/login" />
        }
        if(this.state.postsHere !== null)
        {
            return <Navigate to={`/post/${this.state.postsHere.id}`} />
        }  

        return ( 
            <div className='container py-5' >
                <div className='container'>
                    <h2 className='text-center'>Add Post</h2>
                    <Formik className="m-auto"
                    initialValues={{
                            caption:'',
                            Image:null
                        }}
                        onSubmit={(values,{setSubmitting, props})=>{
                            this.props.addPost(values)
                            .then(res=>{
                                setSubmitting(false)
                                this.setState({postsHere: this.props.currentPost})
                            })
                        }}
                    >
                    {({values, isSubmitting, handleChange, setFieldValue}) =>(
                        <Form className={isSubmitting ? "loading" : "" } >
                                <div className='form-group'>
                                    <label>Image</label>
                                    <div className='input-group'>
                                        <input
                                        className='form-control'
                                        type="file"
                                        name="Image"
                                        onChange={(e)=>{
                                            setFieldValue("Image", e.currentTarget.files[0])
                                        }}
                                        />
                                    </div>
                                </div>
                                <Thumb files={values.Image} />
                                <div className='form-group'>
                                    <label>Caption</label>
                                    <div className='form-input'>
                                        <input
                                        className='form-control'
                                        type="text"
                                        name='caption'
                                        value={values.caption}
                                        onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-5" type="submit">Submit</button>
                            </Form>)
                        }
                    </Formik>
                </div>
            </div>
            );
    }
}

const mapStateToProps=state=>{
    return{
        auth: state.auth,
        currentPost: state.currentPost
    }
}

export default connect(mapStateToProps,{addPost}) (NewPost);
