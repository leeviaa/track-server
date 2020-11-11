require('./models/User')
const express = require('express')
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const bodyParser = require('body-parser');
//init express server for whole app
const app = express();
// use bodyParser to automatically parse incoming  JSON information
app.use(bodyParser.json())
//allows us to use authRoutes
app.use(authRoutes)

//uri for connecting to mongoDB set to a variable
const mongoUri = 'mongodb+srv://leeviaa:Blue1357!@cluster0.lajwc.mongodb.net/<dbname>?retryWrites=true&w=majority'
//connect mongoose(3rd party library to make using mongoDB easier)
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
//code to make sure we successfully connect to mongo Instance
//any time we connect callback will run
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo Instance');
})
//check for errors
mongoose.connection.on('error', (err) => {
  console.error('error connecting to margument', err)
})


//connects whole app to send hi there whenever a request is made
app.get('/', (req,res) => {
  res.send('Hi there! :) ')
})

//app listens for changes on port 3000
app.listen(3000, () => {
  console.log('listening on port 3000')
})