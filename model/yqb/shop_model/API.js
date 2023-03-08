let DAO = require('./DAO')
let common_DAO = require('../../common/DAO')

let shop_api_loader = app => {
    app.use(app.$route.all('/yqb/shop/create', async function (ctx) {
        let params = {
            id: common_DAO.randomString(32),
            merchant_id: ctx.request.query.token_id,
            ...ctx.request.query
        }
        await DAO.create(params)
        ctx.body = {
            success: true
        }
    }))

    app.use(app.$route.all('/yqb/shop/update', async function (ctx) {
        await DAO.update({
            id: ctx.request.query.id,
        }, ctx.request.query)
        ctx.body = {
            success: true
        }
    }))

    // 获取店铺列表
    app.use(app.$route.all('/yqb/shop/find_shops', async function (ctx) {
        const res = await DAO.find_shops(ctx.request.query)
        ctx.body = {
            success: true,
            data: res
        }
    }))
}

module.exports = shop_api_loader