
let global_api_loader = require('./global')

let history_api_loader = require('../model/history_model/API')
let merchant_api_loader = require('../model/merchant_model/API')
let promise_api_loader = require('../model/promise_model/API')
let protocal_api_loader = require('../model/protocal_model/API')
let shop_api_loader = require('../model/shop_model/API')
let user_api_loader = require('../model/user_model/API')
let voucher_api_loader = require('../model/voucher_model/API')
let vouchers_api_loader = require('../model/vouchers_model/API')

let api_loader = app => {
    global_api_loader(app)

    history_api_loader(app)
    merchant_api_loader(app)
    promise_api_loader(app)
    protocal_api_loader(app)
    shop_api_loader(app)
    user_api_loader(app)
    voucher_api_loader(app)
    vouchers_api_loader(app)
}

module.exports = api_loader