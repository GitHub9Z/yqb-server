let DAO = require('./DAO')
let common_DAO = require('../../common/DAO')

let protocal_api_loader = app => {
    // 制定协议
    app.use(app.$route.all('/yqb/protocal/create', async function (ctx) {
        let params = {
            id: common_DAO.randomString(32),
            ...ctx.request.query,
            merchant_id: ctx.request.query.token_id
        }
        await DAO.create(params)
        ctx.body = {
            success: true
        }
    }))
    app.use(app.$route.all('/yqb/protocal/update', async function (ctx) {
        await DAO.update({
            id: ctx.request.query.id,
        }, ctx.request.query)
        ctx.body = {
            success: true
        }
    }))
    // 获取协议列表
    app.use(app.$route.all('/yqb/protocal/find_protocals', async function (ctx) {
        const res = await DAO.find_protocals({
            ...ctx.request.query,
            merchant_id: ctx.request.query.token_id
        })
        ctx.body = {
            success: true,
            data: res
        }
    }))

    // 获取用户当前协议
    app.use(app.$route.all('/yqb/protocal/get_current_promise', async function (ctx) {
        const res = await DAO.get_current_promise(ctx.request.query.protocal_id)
        ctx.body = {
            success: true,
            data: res
        }
    }))
    // 获取协议列表
    app.use(app.$route.all('/yqb/protocal/get_detail', async function (ctx) {
        const res = await DAO.get_protocal_by_id(ctx.request.query.protocal_id)
        ctx.body = {
            success: true,
            data: res
        }
    }))
}

module.exports = protocal_api_loader