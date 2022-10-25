const e = require('express');
const mongoose = require('mongoose');
const collection = require('../collections/collections.js');

const Slot_Schema = new mongoose.Schema({
  sloteNumber: Number,
  block: String,
  company: String,
  available: Boolean,
});
const slot_data = mongoose.model(collection.SLOTES_COLLECTION, Slot_Schema);

module.exports = { slot_data };
