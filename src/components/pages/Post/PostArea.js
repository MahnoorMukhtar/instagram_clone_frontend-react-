import React, { Component } from 'react';
import PostList from './PostList';

class PostArea extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div className=''>
                <PostList/>
            </div>
        );
    }
}

export default PostArea