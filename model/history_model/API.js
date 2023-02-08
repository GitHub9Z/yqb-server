let DAO = require('./DAO')
let common_DAO = require('../common/DAO')
const user_DAO = require('../user_model/DAO')

let history_api_loader = app => {
    // 提现
    app.use(app.$route.all('/yqb/history/withdraw', async function (ctx) {
        const {
            sum,
            token_id: user_id
        } = ctx.request.query

        let rest = await user_DAO.cost(user_id, sum)
        if (rest !== false) {
            ctx.body = {
                success: await DAO.withdraw({
                    id: common_DAO.randomString(32),
                    money: sum,
                    json: JSON.stringify({
                        rest
                    }),
                    user_id,
                    type: 2,
                    status: 1
                })
            }
        } else {
            ctx.body = {
                success: true,
                message: '余额不足 提现失败'
            }
        }

    }))

    // 获取协议列表
    app.use(app.$route.all('/yqb/history/get_user_history', async function (ctx) {
        const res = await DAO.get_user_history(ctx.request.query)
        ctx.body = {
            success: true,
            data: res
        }
    }))

}

module.exports = history_api_loader