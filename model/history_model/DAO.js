const db_manager = require('../../db')

let withdraw = async function (params) {
    await db_manager.save('history', params)
    return true
}

const get_user_history = async function (query) {
    let param = {
        update_time: {
            $gt: Number(query.start_time),
            $lt: Number(query.end_time)
        }
    }
    if (query.token_id) {
        param.user_id = query.token_id
    }
    let res = await db_manager.query('history', param, {
        update_time: -1
    })
    return res
}

module.exports = {
    withdraw,
    get_user_history
}