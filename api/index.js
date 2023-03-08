
let global_api_loader = require('./global')

// yqb
let history_api_loader = require('../model/yqb/history_model/API')
let merchant_api_loader = require('../model/yqb/merchant_model/API')
let promise_api_loader = require('../model/yqb/promise_model/API')
let protocal_api_loader = require('../model/yqb/protocal_model/API')
let shop_api_loader = require('../model/yqb/shop_model/API')
let user_api_loader = require('../model/yqb/user_model/API')
let voucher_api_loader = require('../model/yqb/voucher_model/API')
let vouchers_api_loader = require('../model/yqb/vouchers_model/API')

// jsonote
let git_api_loader = require('../model/jsonote/git_model/API')
let web_api_loader = require('../model/jsonote/web_model/API')


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

    git_api_loader(app)
    web_api_loader(app)
}

module.exports = api_loader