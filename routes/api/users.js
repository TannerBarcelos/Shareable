const express = require('express');
const router = express.Router(); //for routing [look at docs]
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); // for encryption of pswd
const jwt = require('jsonwebtoken'); // for the token
const config = require('config');
const {
  check,
  validationResult
} = require('express-validator/check'); // see express validator docs on how we actually can validate inputs using middleware in our routes


// bring in user model to create new users
const User = require('../../models/User');


/**
 * @route           Post api/users
 * @description     Register User -> use express validator middleware to validate the fields we need to validate to sign a user up
 * @access          Public -> no token needed  
 * @middleware      checks() from express validator to check for errors in any users entry on the route for when registering
 */
router.post('/', [check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  // pull out things from req.body to cleanup the interface here
  const {
    name,
    email,
    password
  } = req.body;

  try {
    // see if user exists 
    // using User object we brought in which represents the database and the users in it.. findOne() will find a user by the given {} passed into it
    // and it returns a proimise, but to conform to ES6+ we use async/await here to clean things up.. async will go on the route callback itself!
    let user = await User.findOne({
      email
    });

    // if found
    if (user) {
      // remember to return so the status is sent and the request fulfills its cycle
      return res.status(400).json({
        errors: [{
          msg: 'User already exists'
        }]
      })
    }

    // get users gravatar [users image] -> should make a gravatar account and import image to use this (must be same email)
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    })


    // else, they did not exists, so, use the req. body stuff we pulled out to represent a user, and make a new User with our user model from user.js mongo file
    user = new User({
      name,
      email,
      avatar,
      password // not yet encrypted, thats the next step
    })

    // encrypt the password (using bcrypt) [3 step process - can see the bcrypt docs if needed]

    // step1) create a salt for the hash
    const salt = await bcrypt.genSalt(10);
    //step2) hash the password the user gave
    user.password = await bcrypt.hash(password, salt);
    //step3) save the user -> will create a random id for the user 
    await user.save();

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