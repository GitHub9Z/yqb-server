const mongoose = require('../../db/mongoose')
const Schema = mongoose.Schema

const history_schema = new Schema({
  id: String,
  // 1 - 收益 / 2 - 提现
  type: Number,
  money: Number,
  json: String,
  // 1 - 审核中 / 2 - 成功 / 3 - 失败
  status: Number,
  user_id: String,
  create_time: Date,
  update_time: Date
})

const history_model = mongoose.model('history', history_schema)
module.exports = {
    'history': history_model
}