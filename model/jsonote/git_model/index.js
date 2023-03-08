
var Mongoose = require('mongoose');
var jsonote_git = new Mongoose.Schema({
    id: String,
    commit: String,
    site_id: String,
    json: String,
    create_time: String,
    update_time: String
});

jsonote_git.index({id: 1});

 
const jsonote_git_model = Mongoose.model('jsonote_git', jsonote_git);
module.exports = {
  'jsonote_git': jsonote_git_model
}