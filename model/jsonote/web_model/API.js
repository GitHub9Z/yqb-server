let DAO = require('./DAO')
let common_DAO = require('../../common/DAO')
let jsonote_git_DAO = require('../git_model/DAO')



let jsonote_web_api_loader = app => {


    /**
     * JsoNote新建网站源码
     * 
     */
    app.use(app.$route.all('/jsonote/web/create', async function (ctx) {
        console.log('觉了', ctx.request.body)
        const {
            id,
            json
        } = ctx.request.body
        const git_id = common_DAO.randomString(32)
        await jsonote_git_DAO.create_git({
            id: git_id,
            json,
            commit: 'init',
            site_id: id
        })

        await DAO.create_web({
            id,
            git_head: '0',
            git_tree: JSON.stringify({
                leval: '0',
                commit: 'init',
                id: git_id,
                child: []
            })
        })

        ctx.body = {
            success: true,
            data: {
                msg: 'success'
            }
        }
    }))

    /**
     * JsoNote更新网站源码
     * 
     */
    app.use(app.$route.all('/jsonote/web/update', async function (ctx) {
        const {
            id,
            json,
            commit,
            site_id
        } = ctx.request.body

        let git_id = common_DAO.randomString(32)
        await jsonote_git_DAO.create_git({
            id: git_id,
            json,
            commit,
            site_id
        })

        let web = await DAO.find_web_by_id(id)

        if (!web) {
            ctx.body = {
                success: false,
                data: null
            }
            return
        }

        let {
            git_head,
            git_tree
        } = web
        let git_tree_obj = JSON.parse(git_tree)
        let git_head_list = git_head.split('-')
        let git_current = null
        for (let index of git_head_list) {
            git_current = git_current ? git_current.child[index] : git_tree_obj
        }
        const leval = `${git_head}-${git_current.child ? git_current.child.length : '0'}`
        git_current.child = [
            ...git_current.child,
            {
                leval,
                commit,
                id: git_id,
                child: []
            }
        ]
        await DAO.update_web({
            id
        }, {
            git_head: leval,
            git_tree: JSON.stringify(git_tree_obj)
        })

        ctx.body = {
            success: true,
            data: {
                msg: 'success'
            }
        }
    }))

    /**
     * JsoNote查询Json
     *
     */
    app.use(app.$route.all('/jsonote/web/find', async function (ctx) {
        const {
            id
        } = ctx.request.query

        let web = await DAO.find_web_by_id(id)

        if (!web) {
            ctx.body = {
                success: false,
                data: null
            }
            return
        }

        let {
            git_head,
            git_tree
        } = web
        let git_tree_obj = JSON.parse(git_tree)
        let git_head_list = git_head.split('-')
        let git_current = null
        for (let index of git_head_list) {
            git_current = git_current ? git_current.child[index] : git_tree_obj
        }
        let git_id = git_current.id
        let res = await jsonote_git_DAO.find_git_by_id(git_id)
        if (res) {
            ctx.body = {
                success: true,
                data: {
                    json: res.json,
                    site_info: web
                },
                msg: '该数据为合法新数据'
            }
        } else {
            ctx.body = {
                success: false,
                msg: '找不到数据'
            }
        }
    }))

    app.use(app.$route.all('/jsonote/web/reset_jsonote_git_head', async function (ctx) {
        let id = ctx.request.query.id
        let git_head = ctx.request.query.git_head

        await DAO.reset_jsonote_git_head(id, git_head)

        ctx.body = {
            success: true,
            data: {
                msg: 'success'
            }
        }
    }))


}

module.exports = jsonote_web_api_loader