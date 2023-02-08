const db_manager = require('../../db')

let create =  async function (params) {
    await db_manager.save('vouchers', params)
}

const find_vouchers = async function (query) {
    let param = {}
    if (query.token_id) {
        param.merchant_id = query.token_id
    }
    if (query.protocal_id) {
        param.protocal_id = query.protocal_id
    }
    if (query.title) {
        param.title = {
            $regex: new RegExp(query.title, 'i')
        }
    }
    let res = await db_manager.fyquery('vouchers', param, query.current, query.page_size)
    return res
}

module.exports = {
    create,
    find_vouchers
}