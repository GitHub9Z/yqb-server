const db_manager = require('../../../db')

let reset_jsonote_git_head =  async function (id, git_head) {
    let res = await db_manager.update('jsonote_web', {
        id
    }, {
        git_head
    })
    return res
}

let find_web_by_id =  async function (id) {
    let res = (await db_manager.query('jsonote_web', {
        id
    }))[0]
    return res
}

let create_web =  async function (params) {
    let res = await db_manager.save('jsonote_web', params)
    return res
}

let update_web =  async function (condition, params) {
    let res = await db_manager.update('jsonote_web', condition, params)
    return res
}

module.exports = {
    reset_jsonote_git_head,
    find_web_by_id,
    create_web,
    update_web
}