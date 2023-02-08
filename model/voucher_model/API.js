const DAO = require('./DAO')
const promise_DAO = require('../promise_model/DAO')
const protocal_DAO = require('../protocal_model/DAO')
const user_DAO = require('../user_model/DAO')

const voucher_api_loader = app => {
    // 核销券码
    app.use(app.$route.all('/yqb/voucher/use', async function (ctx) {
        const {
            token_id: user_id,
            voucher_id,
            protocal_id
        } = ctx.request.query
        const voucher = await DAO.get_voucher_by_id(voucher_id)
        if (voucher.status === 2) {
            ctx.body = {
                success: false,
                message: '券码已被使用'
            }
            return
        }
        if (voucher.status === 3) {
            ctx.body = {
                success: false,
                message: '券码已失效'
            }
            return
        }
        if (!voucher.protocals.includes(protocal_id)) {
            ctx.body = {
                success: false,
                message: '券码不能核销该合约'
            }
            return
        }
        const protocal = await protocal_DAO.get_protocal_by_id(protocal_id)
        const promise = await promise_DAO.get_promise_by_protocal({
            protocal_id,
            user_id
        })
        // 核销逻辑
        let finish = await promise_DAO.then(promise, voucher, protocal)

        // 奖励到用户钱包
        if (finish) await user_DAO.earn(user_id, protocal.bonus)

        ctx.body = {
            success: true
        }
    }))

    // 获取券码列表
    app.use(app.$route.all('/yqb/voucher/find_vouchers', async function (ctx) {
        const res = await DAO.find_vouchers(ctx.request.query)
        ctx.body = {
            success: true,
            data: res
        }
    }))

    // 获取券码详情
    app.use(app.$route.all('/yqb/voucher/get_detail', async function (ctx) {
        const res = await DAO.get_detail(ctx.request.query)
        if (!res) {
            ctx.body = {
                success: false,
                message: '未查询到此券码'
            }
            return
        }
        ctx.body = {
            success: true,
            data: res
        }
    }))
}

module.exports = voucher_api_loader