const express = require('express');
const {
  check,
  validationResult
} = require('express-validator/check');
const auth = require('../../middleware/auth')
const router = express.Router(); //for routing [look at docs]

// models: we need to look into the db so we need our models for such functionality in this whole file for post routes
const Post = require('../../models/Posts')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

/**
 * @route   POST api/posts
 * @desc    Create a post
 * @access  Private -> so need token auth middleware
 */
router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {

  // check for errors in the validation of the text entry or authentication of token
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  // else no errors
  try {
    // find the user in the DB by the id sent in the token and do not allow anyone/thing to see the password with .select('-password)
    const user = await User.findById(req.user.id).select('-password')

    // create a new post object from the form submission
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    })

    // post it and send it back as reponse
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route   GET api/posts
 * @desc    Get all posts
 * @access  Private -> so need token auth middleware [we can make this public to allow anyone signed in or not to see posts (but it makes sense to only allow seeing posts to people who use our app)]
 */
router.get('/', auth, async (req, res) => {
  try {

    // get list of posts by most recent to latest
    const posts = await Post.find().sort({
      date: -1
    });
    res.json(posts)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route   GET api/posts/:id
 * @desc    Get post by ID
 * @access  Private -> so need token auth middleware [we can make this public to allow anyone signed in or not to see posts (but it makes sense to only allow seeing posts to people who use our app)]
 */
router.get('/:id', auth, async (req, res) => {
  try {

    // get the particular post by the ObjectId of the post [object id is the param for the id of a post in the schema]
    const post = await Post.findById(req.params.id);

    // check if post exists.. if not, send 404
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    // else it exists
    res.json(post)
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Post not found'
    });
    res.status(500).send('Server error');
  }
})

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete a post by the id
 * @access  Private -> so need token auth middleware [we can make this public to allow anyone signed in or not to see posts (but it makes sense to only allow seeing posts to people who use our app)]
 */
router.delete('/:id', auth, async (req, res) => {
  try {

    // get list of posts by most recent to latest
    const post = await Post.findById(req.params.id);

    // if post does not exist
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    //check that the user thats deleting the post is the owner of the post [avoidable with the frontend but postman could break this..so check anyways]
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'Not authorized to delete this post'
      });
    }

    //else, then remove it!
    await post.remove();
    res.json({
      msg: 'Post has been removed'
    });

    res.json(post)
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Post not found'
    });
    return res.status(500).send('Server error');
  }
})

/**
 * @route   PUT api/posts/like/:id
 * @desc    Like a post
 * @access  Private -> so need token auth middleware
 */
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post has already been liked by this user [we do not want infinite likes]
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({
        msg: 'Post has already been liked'
      });
    }

    // if it has not, like the post! adding the user to the array of likes so later on the check above will not allow a re-like. Very intuitive
    post.likes.unshift({
      user: req.user.id
    });

    // and save and return
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error')
  }
})

/**
 * @route   PUT api/posts/unlike/:id
 * @desc    Un-like a post
 * @access  Private -> so need token auth middleware
 */
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post has already been liked by this user [we do not want infinite likes]
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({
        msg: 'Post has not yet been liked'
      });
    }

    //else, it has been liked, so lets get the index of our like, to 'unlike' it
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    // remove our like using splice from the likes 
    post.likes.splice(removeIndex, 1);


    // and save and return the list of likes
    await post.save();
    res.json(post.like);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error')
  }
})

/**
 * @route   POST api/posts/comment/:id
 * @desc    Comment on a post
 * @access  Private -> so need token auth middleware
 */
router.post('/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {

  // check for errors in the validation of the text entry or authentication of token
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  // else no errors
  try {
    // find the user in the DB by the id sent in the token and do not allow anyone/thing to see the password with .select('-password)
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id); // the id of the post is in the params


    // create a new comment for a post
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment);

    // post it and send it back as reponse
    await post.save();
    res.json(post.comments);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route   DELETE api/posts/comment/:id/:comment_id
 * @desc    Delete a comment on a post
 * @access  Private -> so need token auth middleware
 */
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    // get the post by the id
    const post = await Post.findById(req.params.id);

    // pull out the comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    // make sure comment exists
    if (!comment) {
      return res.status(404).json({
        msg: 'Comment not found'
      });
    }

    // else it does exist, so check to make sure the user deleting the comment actually made the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized'
      });
    }

    // user is the right user, so, get index of the comment to remove and remove it
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    // remove our like using splice from the likes 
    post.comments.splice(removeIndex, 1);

    await post.save()
    return res.json(comments)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


module.exports = router;