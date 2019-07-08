var express = require('express');
var Post = require('./models/post');
var router = express.Router();

router.get('/', function(req, res, next) {
  Post.find((err, docs) => {
    if (err) {
      next(err);
    } else {
      res.render('index', {
        posts: docs
      })
    }
  });
});

module.exports = router;
