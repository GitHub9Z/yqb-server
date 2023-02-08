let history_model = require('./history_model')
let merchant_model = require('./merchant_model')
let promise_model = require('./promise_model')
let protocal_model = require('./protocal_model')
let shop_model = require('./shop_model')
let user_model = require('./user_model')
let voucher_model = require('./voucher_model')
let vouchers_model = require('./vouchers_model')

module.exports = {
    ...history_model,
    ...merchant_model,
    ...promise_model,
    ...protocal_model,
    ...shop_model,
    ...user_model,
    ...voucher_model,
    ...vouchers_model
}