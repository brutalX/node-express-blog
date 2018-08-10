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

let Article = require('./models/article');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
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
app.get('/article/:id', function(req, res){
  Article.findById(req.params.id, function(err, article) {
    res.render('article', {
      title: 'myBlog',
      article:article
    });
  });
});
app.get('/article/edit/:id', function(req, res){
  Article.findById(req.params.id, function(err, article) {
    res.render('edit_article', {
      title: 'myBlog',
      article:article
    });
  });
});
app.delete('/article/:id' ,function(req, res){
 
    let query = {_id:req.params.id}
    
    Article.remove(query, function(err){
      if(err){
        console.log(err);
      } 
        res.send('Success');
     
    });
})

app.post('/article/update/:id', function(req, res){
  let articleObj = {};
  articleObj.title = req.body.title;
  articleObj.author = req.body.author;
  articleObj.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, articleObj, function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');

    }
  });
});
app.post('/articles/add', function(req, res){
  articleObj = new Article();
  articleObj.title = req.body.title;
  articleObj.author = req.body.author;
  articleObj.body = req.body.body;

  articleObj.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/');

    }
  });
  console.log(articleObj.title + ' ' + articleObj.author + ' ' + articleObj.body);
  return;
});
app.listen(3000, function(){
  console.log('Server started on port 3000')
});