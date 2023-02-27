// 单独的创建一个中间件，然后在app.js中注册使用
const Koa = require('koa2')
const koa_instance = new Koa()
let common_DAO = require('./model/common/DAO')

async function check(ctx, next) {

    let url = ctx.url.split('?')[0]
    // 挂上token_id
    let current_user
    let token = ctx.request.headers["authorization"]
    if (token) {
        current_user = koa_instance.user_pool.find(_i => _i.token === token)
        if (current_user) {
            ctx.request.query && (ctx.request.query.token_id = current_user.user_info?.id)
            ctx.request.body && (ctx.request.body.token_id = current_user.user_info?.id)
        }
    }
    // 如果是登陆页面和注册页面就不需要验证token了
    if (!url.includes(yqb)) {
        await next()
    } if (url === '/yqb/user/LOGIN' || url === '/yqb/user/SMS') {
        await next()
    } else if (url === '/yqb/merchant/LOGIN' || url === '/yqb/merchant/SMS') {
        await next()
    } else if (url === '/yqb/merchant/get_list' || url === '/yqb/merchant/get_detail' || url === '/yqb/protocal/get_detail') {
        await next()
    } else {
        // 否则获取到token
        if (current_user) {
            await next()
        } else {
            ctx.status = 403
            ctx.body = {
                success: false,
                message: '请登录'
            }
        }
    }
}



module.exports = check