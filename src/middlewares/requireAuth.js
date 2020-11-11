const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User');

//write middleware function that takes incoming request and performs some code on it(Verifying jwt);
module.exports = (req, res, next) => {
 //extract header Auth from req
 //express automatically lowercases header names
 const { authorization } = req.headers; 
// authorization === 'Bearer alelkajf12343lkj34'

// if no authorization, send error
 if(!authorization)  {
   return res.status(401).send({error: 'You must be logged in'})
 }

 // get rid of Bearer string and replace with nothing in order to validate token
 const token = authorization.replace('Bearer ', '')
 //verify token args:
 //               -1) token to verify
//                -2) secret key to prevent hacks
//                -3) callback in which we recieve err if there is an error, or payload if everything goes well. payload === information related to user that has the token
jwt.verify(token, 'mysecretkey', async (err, payload) => {
  //if err is present send error message
  if(err) {
    return res.status(401).send({error: 'You must be logged in. '})
  }
  //extract id from payload that we get from a successfull login
  const {userId} = payload;
 // find user from mongodb collection using id from payload
 const user = await User.findById(userId)
 //asign user to req.user so we can access it easily from any other req handler
  req.user = user;
  //call next in order to signify that our middleware is done running and it can move on to the next
  next();
})
}