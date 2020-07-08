import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import {deleteComment} from '../../actions/post';

const CommentItem = ({
  postId,
  comment: {_id, text, name, avatar, user, date},
  deleteComment,
  auth,
}) => (
  <div className="ui raised card" style={{width: '100%', margin: '15px 0'}}>
    <div className="content">
      <div className="meta">
        <span className="category">
          {' '}
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>{' '}
        </span>
      </div>
      <div className="description">
        <p>{text}</p>
      </div>
    </div>
    <div className="extra content">
      {!auth.loading && user === auth.user._id && (
        <button
          className="ui red button"
          onClick={(e) => deleteComment(postId, _id)}
          type="button"
          style={{borderRadius: '15%'}}
        >
          x
        </button>
      )}
      <div className="right floated author">
        {name}
        <Link to={`/profile/${user}`}>
          <img className="ui avatar image" src={avatar} alt={user} />
        </Link>
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {deleteComment})(CommentItem);
