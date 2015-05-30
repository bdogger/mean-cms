var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PageSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: 'Title Required'
  },
  homePage: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Page', PageSchema);