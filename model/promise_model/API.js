let DAO = require('./DAO')
let common_DAO = require('../common/DAO')
let protocal_DAO = require('../protocal_model/DAO')
let merchant_DAO = require('../merchant_model/DAO')

let promise_api_loader = app => {
    // 签约
    app.use(app.$route.all('/yqb/promise/create', async function (ctx) {
        const {
            protocal_id,
            token_id: user_id
        } = ctx.request.query
        const {
            sum,
            time,
            merchant_id
        } = await protocal_DAO.get_protocal_by_id(protocal_id)
        await merchant_DAO.hot(merchant_id)
        await protocal_DAO.hot(protocal_id)
        const protocal_time = time * 24 * 60 * 60 * 1000
        const current_time = new Date().valueOf()
        for (let i = 0; i < sum; i++) {
            await DAO.create({
                id: common_DAO.randomString(32),
                protocal_id,
                user_id,
                merchant_id,
                finish_num: 0,
                status: 1,
                start_time: current_time + i * protocal_time,
                end_time: current_time + (i + 1) * protocal_time,
            })
        }
        ctx.body = {
            success: true
        }
    }))
    // 获取协议列表
    app.use(app.$route.all('/yqb/promise/find_promises', async function (ctx) {
        const res = await DAO.find_promises(ctx.request.query)
        ctx.body = {
            success: true,
            data: res
        }
    }))

    // 获取用户协议列表
    app.use(app.$route.all('/yqb/promise/get_user_promises', async function (ctx) {
        const res = await DAO.get_user_promises(ctx.request.query)
        ctx.body = {
            success: true,
            data: res
        }
    }))

    // 获取用户协议详情
    app.use(app.$route.all('/yqb/promise/get_detail', async function (ctx) {
        const res = await DAO.get_detail(ctx.request.query)
        if (!res) {
            ctx.body = {
                success: false,
                message: '未查询到此合约'
            }
            return
        }
        ctx.body = {
            success: true,
            data: res
        }
    }))

    // 获取用户协议详情
    app.use(app.$route.all('/yqb/promise/get_list', async function (ctx) {
        const res = await DAO.get_list(ctx.request.query)
        if (!res) {
            ctx.body = {
                success: false,
                message: '未查询到此合约'
            }
            return
        }
        ctx.body = {
            success: true,
            data: res
        }
    }))

    // 获取用户协议详情
    app.use(app.$route.all('/yqb/promise/get_bonus', async function (ctx) {
        const res = await DAO.get_bonus(ctx.request.query)
        if (!res) {
            ctx.body = {
                success: true,
                message: 0
            }
            return
        }
        ctx.body = {
            success: true,
            data: res
        }
    }))
}

module.exports = promise_api_loader