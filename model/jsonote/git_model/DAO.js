const db_manager = require('../../../db')

let create_git =  async function (params) {
    let res = await db_manager.save('jsonote_git', params)
    return res
}

let find_git_by_id =  async function (id) {
    let res = (await db_manager.query('jsonote_git', {
        id
    }))[0]
    return res
}

module.exports = {
    create_git,
    find_git_by_id
}