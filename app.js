const express = require('express');
const path= require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogdb');
let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB')
});

db.on('error', function(){
  console.log(err); 
});

let Article = require('./modals/article');

const app = express();

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/' , function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    }else{
      res.render('index', {
        title: 'myBlog',
        articles: articles
      });
    }
  });
});

app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: 'Add Article'
  });
});

app.listen(3000, function(){
  console.log('Server started on port 3000')
});