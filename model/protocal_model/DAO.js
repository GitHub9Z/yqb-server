const db_manager = require('../../db')

const create =  async function (params) {
    await db_manager.save('protocal', params)
}

const update =  async function (query, params) {
    await db_manager.update('protocal', query, params)
}

const find_protocals = async function (query) {
    let param = {}
    if (query.merchant_id) {
        param.merchant_id = query.merchant_id
    }
    if (query.id) {
        param.id = query.id
    }
    if (query.title) {
        param.title = {
            $regex: new RegExp(query.title, 'i')
        }
    }
    let res = await db_manager.fyquery('protocal', param, query.current, query.page_size)
    return res
}

let get_current_promise = async function (query) {
    const current = new Date().valueOf()
    let res = (await db_manager.query('protocal', {
        protocal_id: query.protocal_id,
        user_id: query.token_id,
        start_time: {
            $lt: current
        },
        end_time: {
            $gt: current
        }
    }))?.[0]
    return res
}

let get_protocal_by_id = async function (id) {
    let res = (await db_manager.query('protocal', {
        id
    }))?.[0]?._doc
    res.merchant_info = (await db_manager.query('merchant', {
        id: res.merchant_id
    }))?.[0]
    return res
}

let hot = async function (protocal_id) {
    let protocal = (await db_manager.query('protocal', {
        id: protocal_id
    }))[0]
    if (!protocal) return false

    await db_manager.update('protocal', {
        id: protocal_id
    }, {
        hot: ((protocal.hot || 0) + 1)
    })
    return true
}
module.exports = {
    create,
    update,
    find_protocals,
    get_protocal_by_id,
    get_current_promise,
    hot
}