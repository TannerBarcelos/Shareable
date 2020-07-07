import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import PostForm from './PostForm';

const Posts = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <i class="far fa-plus-square" style={{fontSize: '30px'}}></i>
      <PostForm />
      <div className="ui grid" style={{marginTop: '20px'}}>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps, {
  getPosts,
})(Posts);
