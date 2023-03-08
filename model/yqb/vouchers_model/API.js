let DAO = require('./DAO')
let common_DAO = require('../../common/DAO')
let voucher_DAO = require('../voucher_model/DAO')

let vouchers_api_loader = app => {
    app.use(app.$route.all('/yqb/vouchers/create', async function (ctx) {
        let params = {
            id: common_DAO.randomString(32),
            ...ctx.request.query,
            merchant_id: ctx.request.query.token_id
        }
        await DAO.create(params)
        await voucher_DAO.multi_create(params)
        ctx.body = {
            success: true
        }
    }))

    // 获取发行列表
    app.use(app.$route.all('/yqb/vouchers/find_vouchers', async function (ctx) {
        const res = await DAO.find_vouchers(ctx.request.query)
        ctx.body = {
            success: true,
            data: res
        }
    }))
}

module.exports = vouchers_api_loader