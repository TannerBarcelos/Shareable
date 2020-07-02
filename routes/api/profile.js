const express = require('express');
const router = express.Router(); //for routing [look at docs]

/**
 * @route   GET api/profile
 * @desc    Test route
 * @access  Public -> no token needed
 */
router.get('/', (req, res) => {
  res.send('Profile route')
})

module.exports = router;