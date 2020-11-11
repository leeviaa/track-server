const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

//where we tell mongoose about what each user in user collection
const userSchema = new mongoose.Schema({
 email: {
   type: String,
   unique: true,
   required: true,
 },
 password: {
   type: String,
   required: true,
 }
})

//function to run before user is saved to database
// using regular function definition in order to get access to 'this' keyword (referring to the user)
userSchema.pre('save', function(next){
  const user = this;
  // if user has not modified their password continue
  if(!user.isModified('password')){
    return next();
  }
  //generate the salt
  bcrypt.genSalt(10, (err, salt) => {
    // if err generating salt return err
    if (err) {
      return next(err)
    }
    //has password using the salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      //if error while hashing return
      if(err) {
        return next(err)
      }
      //set user password to hash
      user.password = hash;
      next();
    })
  })
});

// assign a method to user schema, again using regular function declaration in order for 'this' keyword to refer to user
userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  // return promise in order to use async await syntax when comparing passwords
  return new Promise((resolve, reject) => {
    //compare password passed in with hashed password
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      //if errors occur or not a match, reject the promise
      if (err) {
        return reject(err)
      }
      if(!isMatch) {
        return reject(false)
      }
      resolve(true)
    })
  })
}

// associates it with mongoose library
mongoose.model('User', userSchema)