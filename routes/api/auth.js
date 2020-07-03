const express = require('express');
const jwt = require('jsonwebtoken'); // for the token
const bcrypt = require('bcryptjs'); // for encryption of pswd
const config = require('config');
const {
  check,
  validationResult
} = require('express-validator'); // see express validator docs on how we actually can validate inputs using middleware in our routes

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


/**
 * @route           Post api/auth
 * @description     Authenticate user and get their token
 * @access          Public -> no token needed
 * @returns         Users token received from jwt
 */
router.post('/', [check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    // pull out the email and password for this user that is trying to sign in
    const {
      email,
      password
    } = req.body;

    try {
      // see if user exists in the database -> we will be able to see the whole user , but we are using the email field to look them up [usr object will contain all user data]
      let user = await User.findOne({
        email
      });

      // if NOT found
      if (!user) {
        // remember to return so the status is sent and the request fulfills its cycle
        return res.status(400).json({
          errors: [{
            msg: 'Invalid credentials'
          }]
        })
      }

      // else, found user so compare the password entered to the password for this actual user in the database
      const isMatch = await bcrypt.compare(password, user.password)

      // if the password is wrong
      if (!isMatch) {
        return res.status(400).json({
          errors: [{
            msg: 'Invalid credentials'
          }]
        })
      }

      // return the json web token
      // create a payload for the sign() method to make a token [see in docs / trav vid]
      const payload = {
        user: {
          id: user.id // the id of the user created from user.save(),
        }
      }
      // create the token and return it [get the secret token string from our config folder in the default.json]
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      }, (err, token) => {
        if (err) {
          throw err
        };
        res.send({
          token
        })
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  })

module.exports = router;