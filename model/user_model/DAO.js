const db_manager = require('../../db')

let get_user_by_phone = async function (phone) {
    let res = (await db_manager.query('user', {
        phone
    }))[0]
    return res
}

let get_user_by_id = async function (id) {
    let res = (await db_manager.query('user', {
        id
    }))[0]._doc
    res.withdraw = (await db_manager.query('history', {
        user_id: id,
        type: 2,
        status: 2
    })).reduce((sum, next) => {
        return sum + (next.money || 0)
    }, 0)
    return res
}

let earn = async function (user_id, money) {
    let user = await get_user_by_id(user_id)
    await db_manager.update('user', {
        id: user_id
    }, {
        wallet: Number(user.wallet) + Number(money)
    })
    return true
}

let cost = async function (user_id, money) {
    let user = await get_user_by_id(user_id)
    let res = Number(user.wallet) - Number(money)
    if (res < 0) {
        return false
    }
    await db_manager.update('user', {
        id: user_id
    }, {
        wallet: res
    })
    return res
}

module.exports = {
    get_user_by_phone,
    get_user_by_id,
    earn,
    cost
}