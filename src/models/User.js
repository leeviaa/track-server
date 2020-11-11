const mongoose = require('mongoose');

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
// associates it with mongoose library
mongoose.model('User', userSchema)