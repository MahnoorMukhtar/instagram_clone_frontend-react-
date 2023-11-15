import React from 'react';
import PostListItem from './PostListItem';
import { connect } from 'react-redux';
import { addComent, likePost, fetchPost} from '../../../actions/postAction';

class PostList extends React.Component {

    componentDidMount(){
        this.props.fetchPost();
    }

    render() {
        const {user}=this.props.auth
        const posts=this.props.posts


        const postsToBeDisplayed=posts.filter(post=>post.author.user_name !== user.user_name)

        return ( 
            <div className='col mt-5 p-5'>
                {postsToBeDisplayed.length > 0  ? (postsToBeDisplayed.map(post =>{
                    return (
                        <PostListItem
                            key={post.id}
                            post={post}
                            currentUser={user}
                            addComent={this.props.addComent}
                            likePost={this.props.likePost}
                            showElements={ user ? true: false }
                            isPreview={true}
                    />)
                })) :
                <h2>No posts to Display</h2>
                }
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        auth: state.auth,
        posts: state.posts
    }
}

export default connect(mapStateToProps,
    {addComent, likePost, fetchPost})(PostList);