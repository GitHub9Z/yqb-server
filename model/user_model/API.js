let DAO = require('./DAO')
let common_DAO = require('../common/DAO')

let user_api_loader = app => {
    app.use(app.$route.all('/yqb/user/SMS', async function (ctx) {
        let user = await DAO.get_user_by_phone(ctx.request.query.phone)
        if (!user) {
            user = await common_DAO.create('user', {
                id: common_DAO.randomString(8),
                phone: ctx.request.query.phone,
                wallet: 0,
                credit: 1000
            })
        }
        // 检验登录状态 
        app.user_pool.forEach((_i, index) => {
            if (_i.status === '已过期') app.user_pool.splice(index, 1)
        })
        app.user_pool.forEach((_i, index) => {
            if (_i.user_info.user_id === user.user_id) app.user_pool.splice(index, 1)
        })

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        let user_instance = {
            user_info: user,
            SMS: String(rand(1000, 9999)),
            status: '待验证',
            app: 'frontend'
        }
        // https://106.ihuyi.com/webservice/sms.php?method=Submit
        // let url = `https://106.ihuyi.com/webservice/sms.php?method=Submit`
        // var options = {
        //   method: 'post',
        //   url: url,
        //   form: {
        //     account: 'C47996717',
        //     password: '3297edc31a1add657d786e3a065ebfd2',
        //     mobile: ctx.request.query.phone,
        //     content: `您的验证码是：${user_instance.SMS}。请不要把验证码泄露给其他人。`
        // },
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // }

        // const res = await koa2Req(options)
        // console.log(res)
        app.user_pool.push(user_instance)
        setTimeout(() => {
            if (user_instance.status === '待验证') {
                user_instance.status = '已过期'
            }
        }, 120000)
        console.log(app.user_pool)
        ctx.body = {
            success: true
        }
    }))

    app.use(app.$route.all('/yqb/user/LOGIN', async function (ctx) {
        let SMS = ctx.request.query.sms
        let phone = ctx.request.query.phone
        let user = app.user_pool.find(_i => (_i.app === 'frontend') && (_i.user_info.phone === phone))
        if (!user) {
            ctx.body = {
                success: false,
                message: '请先获取验证码'
            }
            return
        }
        if (user.SMS !== SMS) {
            // ctx.body = {
            //     success: false,
            //     message: '短信验证码错误'
            // }
            // return
        }
        if (user.status === '已过期') {
            app.user_pool.forEach((_i, index) => {
                if (_i.status === '已过期') app.user_pool.splice(index, 1)
            })
            ctx.body = {
                success: false,
                message: '短信验证码已过期'
            }
            return
        }
        if (user.status === '已登录') {
            ctx.body = {
                success: true,
                data: {
                    token: user.token
                }
            }
            return
        }
        user.status = '已登录'
        user.token = common_DAO.randomString(32)
        ctx.body = {
            success: true,
            data: {
                token: user.token
            }
        }
    }))

    // 获取商户信息
    app.use(app.$route.all('/yqb/user/get_info', async function (ctx) {
        ctx.body = {
            success: true,
            data: await DAO.get_user_by_id(ctx.request.query.token_id)
        }
    }))

}

module.exports = user_api_loader