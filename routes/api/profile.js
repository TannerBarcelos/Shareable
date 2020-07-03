const express = require('express');
const auth = require('../../middleware/auth') // auth middleware to authenticate th private routes
const {
  check,
  validationResult
} = require('express-validator/check');
const router = express.Router(); //for routing [look at docs]

// bring in profile model AND user to query db on these api hits
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route   GET api/profile/me 
 * @desc    Gets the current users profile with their token after signin auth thats sent
 * @access  Private [so must take the auth middleware we made]
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar'])

    // if we could not find the user with this ID, return bad response
    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this user'
      })
    }

    //else we found it so return all its data
    res.json(profile)

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route   POST api/profile
 * @desc    Create or update a users profile [C,U in CRUD]
 * @access  Private [so must take the auth middleware we made]
 */
router.post('/', auth, async (req, res) => {

  // check for errors for express validator [this step is actually not needed for our app as we do not require any profile info beyond the name, email and password when creating a user registration]
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  // destructure out all the fields from the request body
  const {
    location,
    bio,
    instagram,
    twitter,
    facebook,
    linkedin,
    youtube
  } = req.body;

  // build a profile from the users submissions from the user [this route is hit from a form submissin! this is how we have access]
  const profileFields = {};
  profileFields.user = req.user.id;

  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;

  // build the social media links object [the nested object in the model]
  profileFields.social = {};
  if (instagram) profileFields.social.instagram = instagram;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (youtube) profileFields.social.youtube = youtube;

  // update/create profile
  try {
    // look for a profile in the db
    let profile = await Profile.findOne({
      user: req.user.id
    })

    // if there is, update it 
    if (profile) {
      profile = await Profile.findOneAndUpdate({
        user: req.user.id
      }, {
        $set: profileFields
      }, {
        new: true
      })

      return res.json(profile)
    }

    // else, not found: create it!
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route   GET api/profile
 * @desc    Gets all profiles in our db and sends them back as response
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // get all the profiles from the Profile model
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

/**
 * @route   GET api/profile/user/:user_id
 * @desc    Gets profile by USER id (not the profile id)
 * @access  Public
 */
router.get('/user/:user_id', async (req, res) => {
  try {
    // get all the profiles from the Profile model
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    // check if the profile exists
    if (!profile) {
      return res.status(400).json({
        msg: 'Profile not found'
      });
    }

    // else there is so send the profile for this user back
    res.json(profile)
  } catch (err) {
    console.error(err.message);
    if (err.kinds == 'ObjectId') {
      return res.status(400).json({
        msg: 'Profile not found'
      });
    }
    res.status(500).send('Server error');
  }
})

/**
 * @route   DELETE api/profile
 * @desc    Delete a profile, user and posts
 * @access  Private -> insert the auth middleware
 */
router.delete('/', auth, async (req, res) => {
  try {
    // delete users profile
    // @todo remove users posts
    await Profile.findOneAndRemove({
      user: req.user.id
    })
    // remove the user itself
    await User.findOneAndRemove({
      _id: req.user.id
    })
    res.json({
      msg: 'User removed'
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})



module.exports = router;