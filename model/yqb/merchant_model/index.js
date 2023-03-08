const mongoose = require('../../../db/mongoose')
const Schema = mongoose.Schema

const merchant_schema = new Schema({
  id: String,
  phone: String,
  title: String,
  header: String,
  hint: String,
  score: Number,
  hot: Number,
  type: Number,
  create_time: Date,
  update_time: Date
})

const merchant_model = mongoose.model('merchant', merchant_schema)
module.exports = {
    'merchant': merchant_model
}