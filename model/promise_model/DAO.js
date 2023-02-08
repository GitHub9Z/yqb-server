const db_manager = require('../../db')

const create =  async function (params) {
    await db_manager.save('promise', params)
}

const get_promise_by_protocal = async function ({
    protocal_id, 
    user_id
}) {
    const current_time = new Date()
    let res = (await db_manager.query('promise', {
        user_id,
        protocal_id,
        start_time: {
            $lt: current_time
        },
        end_time: {
            $gt: current_time
        }
    }))[0]
    return res
}

const then = async function (promise, voucher, { task_num, task_type }) {
    let param = {
        finish_num: (promise.finish_num || 0) + JSON.parse(voucher.task_num)[task_type]
    }
    if (param.finish_num >= task_num) {
        // 合约已完成逻辑
        param.finish_num = task_num
        param.status = 3
    }

    await db_manager.update('promise', {
        id: promise.id,
    }, param)
    await db_manager.update('voucher', {
        id: voucher.id,
    }, {
        status: 2
    })
    
    if (param.status === 3) {
        return true
    } else {
        return false
    }
}

const find_promises = async function (query) {
    let param = {}
    if (query.id) {
        param.id = query.id
    }
    if (query.protocal_id) {
        param.protocal_id = query.protocal_id
    }
    let res = await db_manager.fyquery('promise', param, Number(query.current), Number(query.page_size))
    return res
}

  // 合约状态 1:未开始 2:进行中 3:已完成 4:已违约 5:已解约
const update_status = async function (promise_id) {
    let current = new Date().valueOf()
    let promise = (await db_manager.query('promise', {
        id: promise_id
    }))[0]
    if (!promise.status) {
        promise.status = 1
    }
    switch (promise.status) {
        case 1: {
            // 开始合约
            if (new Date(promise.start_time).valueOf() <= current) {
                await db_manager.update('promise', {
                    id: promise_id
                }, {
                    status: 2
                })
                return 2
            } else {
                return 1
            }
        }
        case 2: {
            // 结束合约
            if (new Date(promise.end_time).valueOf() <= current) {
                await db_manager.update('promise', {
                    id: promise_id
                }, {
                    status: 4
                })
                return 4
            } else {
                return 2
            }
            
        }
    }
}

const get_user_promises = async function (query) {
    const current = new Date().valueOf()
    let param = {
        start_time: {
            $lt: current
        },
        end_time: {
            $gt: current
        }
    }
    if (query.token_id) {
        param.user_id = query.token_id
    }
    let res = await db_manager.query('promise', param)
    res = res.map(_i => _i._doc)
    let pool = res.map(_i => {
        return (async () => {
            // 查询时更新状态
            _i.status = await update_status(_i.id)
            _i.merchant = (await db_manager.query('merchant', {
                id: _i.merchant_id
            }))[0]
            _i.protocal = (await db_manager.query('protocal', {
                id: _i.protocal_id
            }))[0]
        })()
    })
    await Promise.all(pool)
    return res
}

const get_list = async function (query) {
    let param = {}
    if (query.token_id) {
        param.user_id = query.token_id
    }
    if (query.protocal_id) {
        param.protocal_id = query.protocal_id
    } else {
        return null
    }
    let res = await db_manager.query('promise', param)
    res = res.map(_i => _i._doc)
    let pool = res.map(_i => {
        return (async () => {
            // 查询时更新状态
            _i.status = await update_status(_i.id)
        })()
    })
    await Promise.all(pool)
    return res
}

let get_promise_by_id = async function (id) {
    let res = (await db_manager.query('promise', {
        id
    }))?.[0]?._doc
    return res
}

let get_detail = async function ({ promise_id }) {
    let res = (await db_manager.query('promise', {
        id: promise_id
    }))?.[0]?._doc
    if (!res) return null
    res.merchant = (await db_manager.query('merchant', {
        id: res.merchant_id
    }))[0]
    res.protocal = (await db_manager.query('protocal', {
        id: res.protocal_id
    }))[0]
    return res
}

let get_bonus = async function (query) {
    const current = new Date().valueOf()
    let param = {
        start_time: {
            $lt: current
        },
        end_time: {
            $gt: current
        }
    }
    if (query.token_id) {
        param.user_id = query.token_id
    }
    let res = await db_manager.query('promise', param)
    res = res.map(_i => _i._doc)
    let sum = await res.reduce(async (front, next) => {
        let protocal = (await db_manager.query('protocal', {
            id: next.protocal_id
        }))[0]
        return (30 / protocal.time) * protocal.bonus + (await front)
    }, 0)
    return sum
}

module.exports = {
    create,
    get_promise_by_protocal,
    then,
    find_promises,
    get_user_promises,
    get_promise_by_id,
    get_detail,
    get_list,
    get_bonus
}