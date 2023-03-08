let history_model = require('./yqb/history_model')
let merchant_model = require('./yqb/merchant_model')
let promise_model = require('./yqb/promise_model')
let protocal_model = require('./yqb/protocal_model')
let shop_model = require('./yqb/shop_model')
let user_model = require('./yqb/user_model')
let voucher_model = require('./yqb/voucher_model')
let vouchers_model = require('./yqb/vouchers_model')

let git_model = require('./jsonote/git_model')
let web_model = require('./jsonote/web_model')


module.exports = {
    ...history_model,
    ...merchant_model,
    ...promise_model,
    ...protocal_model,
    ...shop_model,
    ...user_model,
    ...voucher_model,
    ...vouchers_model,
    ...git_model,
    ...web_model
}