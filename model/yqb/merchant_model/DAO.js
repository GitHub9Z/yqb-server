const db_manager = require('../../../db')

let get_users_by_merchant = async function ({
    id,
    current,
    page_size
}) {
    let user_list = await db_manager.query('promise', {
        merchant_id: id
    }, null, 'user')
    let res_list = user_list.splice((current - 1) * page_size, page_size)
    let pool = res_list.map(_i => {
        return (async () => {
            const _user = (await db_manager.query('user', {
                id: _i
            }))[0]
            _user.promise_list = await db_manager.query('promise', {
                merchant_id: id,
                user_id: _i
            })
        })()
    });
    await Promise.all(pool)
    return res_list
}

let get_merchant_by_phone = async function (phone) {
    let res = (await db_manager.query('merchant', {
        phone
    }))[0]
    return res
}

let get_merchant_by_id = async function (id, user_id) {
    let res = (await db_manager.query('merchant', {
        id
    }))?.[0]?._doc
    if (!res) return false
    res.shops = (await db_manager.query('shop', {
        merchant_id: res.id
    }))
    res.protocals = (await db_manager.query('protocal', {
        merchant_id: res.id
    })).map(_i => _i._doc)
    if (user_id) {
        let pool = res.protocals.map(_i => (async () => {
            const current = new Date().valueOf()
            let _res = await db_manager.query('promise', {
                user_id: user_id,
                protocal_id: _i.id,
                start_time: {
                    $lt: current
                },
                end_time: {
                    $gt: current
                }
            })
            if (_res.length) {
                _i.doing = _res[0]?.id
            }
        })())
        await Promise.all(pool)
    }
    return res
}

let update_info = async function ({
    token_id,
    title,
    hint,
    header,
    type
}) {
    if (!token_id) return false
    await db_manager.update('merchant', {
        id: token_id
    }, {
        title,
        hint,
        header,
        type
    })
    return true
}

const get_list = async function (query) {
    let param = {}
    if (query.sort) {
        // 排序
    }
    if (query.keyword) {
        // 搜索
        param.title = {
            $regex: new RegExp(query.keyword, 'i')
        }
    }
    if (query.type) {
        // 分类
        param.type = query.type
    }
    let res = await db_manager.fyquery('merchant', param, Number(query.current), Number(query.page_size))
    res.data = res.data.map(_i => _i._doc)
    let pool = res.data.map(_i => {
        return (async () => {
            _i.shops = (await db_manager.query('shop', {
                merchant_id: _i.id
            }))
            _i.protocals = (await db_manager.fyquery('protocal', {
                merchant_id: _i.id
            }, 0, 3)).data
        })()
    })
    await Promise.all(pool)
    return res
}

let hot = async function (merchant_id) {
    let merchant = (await db_manager.query('merchant', {
        id: merchant_id
    }))[0]
    if (!merchant) return false

    await db_manager.update('merchant', {
        id: merchant_id
    }, {
        hot: ((merchant.hot || 0) + 1)
    })
    return true
}

module.exports = {
    get_users_by_merchant,
    get_merchant_by_phone,
    get_merchant_by_id,
    update_info,
    get_list,
    hot
}