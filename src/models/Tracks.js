const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  },
})

const trackSchema = new mongoose.Schema({
  userId: {
    // type of ObjectId is how we indicated that this is a reference to another object stored inside mongoDB
    type: mongoose.Schema.Types.ObjectId,
    //what it is a reference to, pointing it to a reference of a user
    ref: 'User',
  
  },
  name: {
    type: String,
    default: ''
  },

  locations: [pointSchema]
})

mongoose.model('Track', trackSchema);