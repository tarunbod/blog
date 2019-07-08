var express = require('express');

var nconf = require('nconf');
nconf.file({ 'file': 'config.json' });

var Post = require('./models/post');

var router = express.Router();

router.get('/', function(req, res, next) {
  Post.find().sort({ postDate: -1 }).exec((err, docs) => {
    if (err) {
      next(err);
    } else {
      res.render('index', {
        title: nconf.get('blog_name'),
        posts: docs
      })
    }
  });
});

router.get('/new_post', function(req, res, next) {
  res.render('new_post');
});

router.post('/post', function(req, res, next) {
  var bodyParagraphs = req.body.body.replace(/\r/g, "").replace(/\n+/g, "\n").split('\n');
  var nonEmptyParagraphs = [];
  for (var paragraph of bodyParagraphs) {
    if (paragraph.length != 0) {
      nonEmptyParagraphs.push(paragraph);
    }
  }
  var newPost = new Post({
    title: req.body.title,
    body: nonEmptyParagraphs,
    postDate: new Date()
  });
  newPost.save((err, result) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/view_post', function(req, res, next) {
  Post.findById(req.query.id, (err, doc) => {
    if (err) {
      next(err);
    } else {
      res.render('view_post', doc);
    }
  });
});

module.exports = router;
