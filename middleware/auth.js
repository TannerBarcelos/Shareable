const jwt = require('jsonwebtoken');
const config = require('config'); // to bring in the secret from the config folder in the json file we made for our config data for jwt and mongoose connection

/**
 * a middleware has access to both req and res and also a callback to run (usually we call it next() to go to the next middleware)
 * this middleware will be used in any private routes to decode the token and allow access to that route [like a personal page with our own info , etc.]
 */

module.exports = function (req, res, next) {
  // get token header from the request
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No token. Authorization denied.'
    })
  }

  // else there was a token, so try to parse it
  try {
    // decode the token
    const decoded = jwt.verify(token, config.get('jwtSecret')); // get the secret string
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'token is not valid'
    })
  }
}

/**
 * 
 * line 23 shows req.user = decoded.user -> the request is a token sent in the headers of the request... the payload of the token 
 * will have that user property attached which is why we decoded the token into req.user to allow access to the private route
 * // create a payload for the sign() method to make a token [see in docs / trav vid]
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
 */