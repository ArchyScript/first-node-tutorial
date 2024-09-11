const mongoose = require('mongoose')
const Schema = mongoose.Schema

//
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
})

module.exports = mongoose.model('Post', PostSchema)
