const db_manager = require('../db')
const NacosConfigClient = require('nacos').NacosConfigClient; // js

let global_api_loader = app => {

    app.use(app.$route.all('/global/find', async function (ctx) {
        let table = ctx.request.query.table
        let pageNo = ctx.request.query.pageNo || 0
        let pageSize = ctx.request.query.pageSize || 5
        let res = await db_manager.fyquery(table, null, Number(pageNo), Number(pageSize))
        ctx.body = res
    }))

    app.use(app.$route.all('/global/create', async function (ctx) {
        let table = ctx.request.query.table
        let data = JSON.parse(ctx.request.query.data)
        let res = await db_manager.save(table, data)
        if (res) ctx.body = 'success'
    }))

    app.use(app.$route.all('/global/delete', async function (ctx) {
        let table = ctx.request.query.table
        let data = JSON.parse(ctx.request.query.data)
        let res = await db_manager.delete(table, {
            _id: data._id
        })
        if (res) ctx.body = 'success'
    }))

    app.use(app.$route.all('/global/update', async function (ctx) {
        let table = ctx.request.query.table
        let data = JSON.parse(ctx.request.query.data)
        let res = await db_manager.update(table, {
            _id: data._id
        }, data)
        if (res) ctx.body = 'success'
    }))
}

module.exports = global_api_loader