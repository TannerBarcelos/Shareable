import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import {getPost} from '../../actions/post';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// helper components
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPost, post: {post, loading}, match}) => {
  useEffect(() => {
    // get the id in the browser url: match is a prop passed into any component in a router
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link
        to="/posts"
        className="ui green button"
        style={{marginBottom: '20px'}}
      >
        Back to feed
      </Link>
      <CommentForm postId={post._id} />
      <PostItem post={post} showActions={false} />
      <div className="ui container">
        {/**map all the comments for this post */}
        {post.comments.map((comment) => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

// map post state
const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, {getPost})(Post);
