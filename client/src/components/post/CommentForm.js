import React, {useState} from 'react';
import {connect} from 'react-redux';

// actions
import {addComment} from '../../actions/post';

import PropTypes from 'prop-types';

// on submit callback for the form: takes in all the block level state and variables/callbacks from the component itself
const onSubmit = (e, postId, text, addComment, setText) => {
  e.preventDefault();
  addComment(postId, {
    text,
  });
  setText('');
};

const onChange = (e, setText) => {
  setText(e.target.value);
};

const CommentForm = ({postId, addComment}) => {
  // to control the form input
  const [text, setText] = useState('');

  return (
    <form
      className="ui form"
      onSubmit={(e) => onSubmit(e, postId, text, addComment, setText)}
    >
      <div className="field">
        <label> Leave a comment </label>
        <textarea value={text} onChange={(e) => onChange(e, setText)} />
      </div>
      <button className="ui button" type="submit">
        Submit
      </button>
    </form>
  );
};

//ptfr for functions ptor for objects
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, {
  addComment,
})(CommentForm);
