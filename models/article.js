let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let articleSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required:true
  }

});

module.exports = mongoose.model('articles', articleSchema);