import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const PostForm = ({addPost}) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({text});
    setText(''); // re-set state
  };

  return (
    <form
      className="ui form"
      onSubmit={onSubmit}
      style={{marginBottom: '20px'}}
    >
      <div className="field">
        <label>What's on your mind?</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button className="ui button" type="submit">
        Submit
      </button>
    </form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, {addPost})(PostForm);
