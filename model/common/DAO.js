const db_manager = require('../../db')

let fyquery = async function (table, params, pageNo = 0, pageSize = 5) {
    let res = await db_manager.fyquery(table, params, Number(pageNo), Number(pageSize))
    return res
}

let query = async function (table, params) {
    let res = await db_manager.query(table, params)
    return res
}

let count = async function (table, params) {
    let res = await db_manager.count(table, params)
    return res
}

let create = async function (table, data) {
    let res = await db_manager.save(table, data)
    return res
}

let update = async function (table, condition, data) {
    let res = await db_manager.update(table, condition, data)
    if (res) return 'success'
}

let updateMany = async function (table, condition, data) {
    let res = await db_manager.updateMany(table, condition, data)
    if (res) return 'success'
}


let randomString = (len) => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}


module.exports = {
    query, // 查询全部
    count,
    fyquery, // 分页查询
    create,
    update,
    updateMany,
    randomString
}