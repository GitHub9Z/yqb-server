
var Mongoose = require('mongoose');
var jsonote_web = new Mongoose.Schema({
    id: String,
    git_head: String,
    git_tree: String,
    create_time: String,
    update_time: String
});

jsonote_web.index({id: 1});

const jsonote_web_model = Mongoose.model('jsonote_web', jsonote_web);
module.exports = {
  'jsonote_web': jsonote_web_model
}
