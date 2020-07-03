const express = require('express');
const router = express.Router(); //for routing [look at docs]
const auth = require('../../middleware/auth'); // bring in auth middleware to be used for the protcted routes 

// bring in user model in order to find a user, if he/she exists in our DB
const User = require('../../models/User')

/**
 * @route   GET api/auth
 * @desc    Test route
 * @access  Private-> token needed [use auth middleware we made] (imported above from our middleware dir)
 */
router.get('/', auth, async (req, res) => {
  try {
    // call to the database and return the users info by the requests user token payload.id without the password!! [see select]
    // since we want the id, notice we used findbyId() instead of findOne() looking for user by their email
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

module.exports = router;