const mongoose = require('../../db/mongoose')
const Schema = mongoose.Schema

const shop_schema = new Schema({
  id: String,
  phone: String,
  title: String,
  longitude: Number,
  latitude: Number,
  merchant_id: String,
  create_time: Date,
  update_time: Date
})

const shop_model = mongoose.model('shop', shop_schema)
module.exports = {
    'shop': shop_model
}