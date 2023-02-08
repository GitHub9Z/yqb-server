const mongoose = require('../../db/mongoose')
const Schema = mongoose.Schema

const voucher_schema = new Schema({
  id: String,
  // 批次号
  vouchers_id: String,
  protocals: Array,
  // 核销人
  used_user_id: String,
  // 核销指标数 {1: 1, 2: 1, 3: 1}
  task_num: Object,
  merchant_id: String,
  // 1-未使用 / 2-已使用 / 3-已失效
  status: Number,
  create_time: Date,
  update_time: Date
})

const voucher_model = mongoose.model('voucher', voucher_schema)
module.exports = {
    'voucher': voucher_model
}