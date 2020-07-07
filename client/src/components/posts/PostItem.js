import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BG from '../../img/bg.jpg';

import {addLike, removeLike, deletePost} from '../../actions/post';

const PostItem = ({
  addLike,
  deletePost,
  removeLike,
  auth,
  post: {_id, text, name, avatar, user, likes, comments, date},
  showActions,
}) => {
  return (
    <div className="four wide column">
      <div className="ui card">
        <div className="content">
          <div className="right floated meta">
            {<Moment format="YYYY/MM/DD">{date}</Moment>}
          </div>
          <Link to={`/profile/${user}`}>
            <img className="ui avatar image" src={avatar} />
          </Link>
          {name}
        </div>
        <div className="image">
          <img src={BG} />
        </div>
        <div className="content" style={{padding: '10px'}}>
          <p>{text}</p>
          {showActions && (
            <Fragment>
              <span className="right floated">
                <i
                  className="fas fa-thumbs-up"
                  onClick={(e) => addLike(_id)}
                ></i>
                <i
                  className="fas fa-thumbs-down"
                  onClick={(e) => removeLike(_id)}
                  style={{marginLeft: '20px'}}
                ></i>
              </span>
              <Link to={`/posts/${_id}`}>
                <i className="far fa-comment" style={{fontSize: '30px'}}></i>
                {comments.length > 0 && <span>{comments.length} comments</span>}
              </Link>
              <br />
              {likes.length > 0 && <span>{likes.length}likes</span>}
              <br />
              {!auth.loading && user === auth.user._id && (
                <span>
                  <button
                    type="button"
                    className="ui red button"
                    onClick={(e) => deletePost(_id)}
                    style={{width: '100%'}}
                  >
                    Delete Post
                  </button>
                </span>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(
  PostItem
);
