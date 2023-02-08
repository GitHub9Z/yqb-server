const db_manager = require('../../db')

let create =  async function (params) {
    await db_manager.save('voucher', params)
}

const multi_create = async function ({
    id,
    token_id,
    protocals,
    sum,
    task_num
}) {
    for (let i = 0; i < sum; i++) {
        create({
            id: db_manager.randomString(32),
            // 批次号
            merchant_id: token_id,
            vouchers_id: id,
            protocals,
            // 核销指标数
            task_num,
            status: 1
        })
    }
}

const find_vouchers = async function (query) {
    let param = {}
    if (query.id) {
        param.id = query.id
    }
    if (query.vouchers_id) {
        param.vouchers_id = query.vouchers_id
    }
    let res = await db_manager.fyquery('voucher', param, Number(query.current), Number(query.page_size))
    return res
}

let get_voucher_by_id = async function (id) {
    let res = (await db_manager.query('voucher', {
        id
    }))[0]
    return res
}

let get_detail = async function ({ voucher_id }) {
    let res = (await db_manager.query('voucher', {
        id: voucher_id
    }))?.[0]?._doc
    if (!res) return null
    return res
}


module.exports = {
    multi_create,
    find_vouchers,
    get_detail,
    get_voucher_by_id
}