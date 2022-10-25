const e = require('express');
const mongoose = require('mongoose');
const collection = require('../collections/collections.js');

/**
 * user data
 */

const User_Schema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: Number,
});
const user_data = mongoose.model(collection.USER_COLLECTION, User_Schema);

const FormSubmission_Scheema = new mongoose.Schema({
  fname:String,
  lname:String,
  email:String,
  city:String,
  companyName:String,
  pin:String,
  state:String,
  streetAddress:String,
  a:String,
  b:String,
  c:String,
  d:String,
  e:String,
  incubationType:String,
  viewApplication:Boolean,
  applicationStatus:String,
})
const application_data = mongoose.model(collection.APPLICATION_COLLECTION, FormSubmission_Scheema);


module.exports = { user_data,application_data};
