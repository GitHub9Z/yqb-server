const mongoose = require('../../../db/mongoose')
const Schema = mongoose.Schema

const vouchers_schema = new Schema({
  id: String,
  merchant_id: String,
  sum: Number,
  create_time: Date,
  update_time: Date
})

const vouchers_model = mongoose.model('vouchers', vouchers_schema)
module.exports = {
    'vouchers': vouchers_model
}