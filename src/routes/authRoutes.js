const express = require('express');
const mongoose = require("mongoose");
//can use this to create new user, find users, etc...
const User = mongoose.model('User')

const router = express.Router();

//create signup link using post request
router.post('/signup',  async (req, res) => {
  const {email, password} = req.body;
  const user = new User({email, password})
  await user.save()
  res.send('user saved')
})

module.exports = router;