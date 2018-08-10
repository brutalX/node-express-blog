const express = require('express');
const path= require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://admindb:admin123@ds115022.mlab.com:15022/blogdb';
mongoose.connect(mongoDB,  { useNewUrlParser: true });
let db = mongoose.connection;
mongoose.Promise = global.Promise;
db.once('open', function(){
  console.log('Connected to MongoDB')
});

db.on('error', function(){
  console.log(err); 
});

let Article = require('./modals/article');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
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
    title: 'myBlog'
  });
});

app.post('/articles/add', function(req, res){
  articlemod = new Article();
  articlemod.title = req.body.title;
  articlemod.author = req.body.author;
  articlemod.body = req.body.body;

  articlemod.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');

    }
  });
  console.log(articlemod.title + ' ' + articlemod.author + ' ' + articlemod.body);
  return;
});
app.listen(3000, function(){
  console.log('Server started on port 3000')
});