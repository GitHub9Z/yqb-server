const mongoose = require('../../db/mongoose')
const Schema = mongoose.Schema

const promise_schema = new Schema({
  id: String,
  merchant_id: String,
  user_id: String,
  protocal_id: String,
  user_id: String,
  // 合约起始时间
  start_time: Date,
  // 合约结束时间
  end_time: Date,
  // 完成指标数
  finish_num: Number,
  // 合约状态 1:未开始 2:进行中 3:已完成 4:已违约 5:已解约
  status: Number,
  create_time: Date,
  update_time: Date
})

const promise_model = mongoose.model('promise', promise_schema)
module.exports = {
    'promise': promise_model
}