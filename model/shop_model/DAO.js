const db_manager = require('../../db')

let create =  async function (params) {
    await db_manager.save('shop', params)
}

const update =  async function (query, params) {
    await db_manager.update('shop', query, params)
}

const find_shops = async function (query) {
    let param = {}
    if (query.token_id) {
        param.merchant_id = query.token_id
    }
    if (query.id) {
        param.id = query.id
    }
    if (query.title) {
        param.title = {
            $regex: new RegExp(query.title, 'i')
        }
    }
    let res = await db_manager.fyquery('shop', param, query.current, query.page_size)
    return res
}

module.exports = {
    create,
    update,
    find_shops
}