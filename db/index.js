// db/index.js
const model_config = require('../model')


class Mongodb {
  constructor() {

  }
  // 查询
  query(model, condition, sort = {}, distinct) {
    return new Promise((resolve, reject) => {
      let _i = model_config[model].find(condition || {}, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }).sort(sort)
      if (distinct) {
        _i.distinct(distinct)
      }
    })
  }
  // 查询数量
  count(model, condition) {
    return new Promise((resolve, reject) => {
      model_config[model].count(condition || {}, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 分页查询
  fyquery(model, condition, pageNo = 0, pageSize = 5, sort = {}) {
    return new Promise((resolve, reject) => {
      model_config[model].find(condition || {}, (err, res) => {
          if (err) {
            reject(err)
          }
          model_config[model].count(condition || {}, (err, count) => {
            resolve({
              data: res,
              count
            })
          })
        }).sort(sort).skip(Number(pageNo) * Number(pageSize))
        .limit(Number(pageSize))
    })
  }
  // 查询
  delete(model, condition) {
    return new Promise((resolve, reject) => {
      model_config[model].remove(condition || {}, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 保存
  save(model, obj) {
    const m = new model_config[model]({
      ...obj,
      create_time: new Date(),
      update_time: new Date()
    })
    return new Promise((resolve, reject) => {
      m.save((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log(res)
      })
    })
  }
  // 更新
  update(model, condition, obj) {
    const m = new model_config[model]({
      ...obj,
      update_time: new Date()
    })
    return new Promise((resolve, reject) => {
      model_config[model].update(condition, obj, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log(res)
      })
    })
  }
  // 批量更新
  updateMany(model, condition, obj) {
    const m = new model_config[model]({
      ...obj,
      update_time: new Date()
    })
    return new Promise((resolve, reject) => {
      model_config[model].updateMany(condition, obj, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log(res)
      })
    })
  }
  randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}
module.exports = new Mongodb()