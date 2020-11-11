const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
//can use this to create new user, find users, etc...
const User = mongoose.model('User')

const router = express.Router();

//create signup link using post request
router.post('/signup',  async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = new User({email, password})
    await user.save()
    const token = jwt.sign({userId: user._id}, 'mysecretkey' );
    res.send({token})
  } catch (e) {
   return res.status(422).send(e.message)
  }
 
})

router.post('/signin', async (req,res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    return res.status(422).send({error: 'Must provide email and password.'})
  }
  // find user based on email from req.body
  const user = await User.findOne({email})
  if(!user) {
    return res.status(404).send({error: 'Invalid password or email'})
  }
  try {
    // use comparePassword method made in user model
  await user.comparePassword(password)
  const token = jwt.sign({userId: user._id}, 'mysecretkey')
  res.send({token})
  } catch (err) {
    return res.status(404).send({error: 'Invalid password or email'})
  }
  
})

module.exports = router;