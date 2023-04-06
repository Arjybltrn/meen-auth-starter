// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/users.js');

// New (login page)

// Delete (logout route)

// Create (login route)
sessionsRouter.post('/', async (req, res) => {
    // try {
    // Check for an existing user
    const foundUser = await User.findOne({ email: req.body.email });
// send error message if no user is found
if (!foundUser) {
    res.send(`Oops! No user with that email address has been registered.`);
  } else {
    // If a user has been found
    // compare the given password with the hashed password we have stored
    const passwordMatches = await bcrypt.compare(req.body.password, foundUser.password);
    // if the passwords match
    if (passwordMatches) {
      // add the user to our session
      req.session.currentUser = foundUser;
      // redirect back to our home page
      res.redirect('/');
    } else {
      // if the passwords don't match
      res.send('Oops! Invalid credentials.');
    }
  }
// } catch (error) {
//     console.error(error);
//     res.status(500).send('Oops! Something went wrong.');
//     }
    });

// Export Sessions Router
module.exports = sessionsRouter;