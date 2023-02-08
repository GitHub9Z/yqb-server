const mongoose = require('../../db/mongoose')
const Schema = mongoose.Schema

const user_schema = new Schema({
  id: String,
  phone: String,
  wallet: Number,
  credit: Number,
  withdraw: Number,
  create_time: Date,
  update_time: Date
})

const user_model = mongoose.model('user', user_schema)
module.exports = {
    'user': user_model
}