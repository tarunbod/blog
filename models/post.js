var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  body: [String],
  postDate: { type: Date, default: Date.now }
});

postSchema.methods.preview = function() {
  return this.body.join(' ').split(' ').slice(0, 50).join(' ') + ' ...';
}

module.exports = mongoose.model("Post", postSchema);
