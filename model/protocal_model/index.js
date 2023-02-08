const mongoose = require('../../db/mongoose')
const Schema = mongoose.Schema

const protocal_schema = new Schema({
  id: String,
  merchant_id: String,
  title: String,
  hint: String,
  type: String,
  // 金额
  bonus: String,
  // 单周期时长
  time: Number,
  // 周期数
  sum: Number,
  // 指标数
  task_num: Number,
  // 指标类型 1:次数 2:金额 3:时长
  task_type: Number,
  // 状态 
  status: Boolean,
  hot: Number,
  create_time: Date,
  update_time: Date
})

const protocal_model = mongoose.model('protocal', protocal_schema)
module.exports = {
    'protocal': protocal_model
}