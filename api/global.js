const db_manager = require('../db')
const NacosConfigClient = require('nacos').NacosConfigClient; // js

let global_api_loader = app => {

    app.use(app.$route.all('/global/find', async function (ctx) {
        let table = ctx.request.query.table
        let pageNo = ctx.request.query.pageNo || 0
        let pageSize = ctx.request.query.pageSize || 5
        let res = await db_manager.fyquery(table, null, Number(pageNo), Number(pageSize))
        ctx.body = res
    }))

    app.use(app.$route.all('/global/create', async function (ctx) {
        let table = ctx.request.query.table
        let data = JSON.parse(ctx.request.query.data)
        let res = await db_manager.save(table, data)
        if (res) ctx.body = 'success'
    }))

    app.use(app.$route.all('/global/delete', async function (ctx) {
        let table = ctx.request.query.table
        let data = JSON.parse(ctx.request.query.data)
        let res = await db_manager.delete(table, {
            _id: data._id
        })
        if (res) ctx.body = 'success'
    }))

    app.use(app.$route.all('/global/update', async function (ctx) {
        let table = ctx.request.query.table
        let data = JSON.parse(ctx.request.query.data)
        let res = await db_manager.update(table, {
            _id: data._id
        }, data)
        if (res) ctx.body = 'success'
    }))

    app.use(app.$route.all('/global/table_config', async function (ctx) {
        ctx.body = [{
            label: 'Inlay',
            options: [{
                value: JSON.stringify({
                    name: 'inlay_user',
                    columns: [{
                        prop: 'user_id',
                        label: '用户id',
                        width: 180
                    }, {
                        prop: 'user_name',
                        label: '用户名称',
                        width: 180
                    }, {
                        prop: 'user_phone',
                        label: '手机号码',
                        width: 180
                    }, {
                        prop: 'wechat_id',
                        label: '微信号',
                        width: 180
                    }, {
                        prop: 'luck',
                        label: '幸运值',
                        width: 180
                    }, {
                        prop: 'user_asset',
                        label: '用户资产',
                        width: 180
                    }, {
                        prop: 'user_address',
                        label: '用户地址'
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '用户'
            }, {
                value: JSON.stringify({
                    name: 'inlay_theme',
                    columns: [{
                        prop: 'theme_id',
                        label: '主题id',
                        width: 180
                    }, {
                        prop: 'theme_name',
                        label: '主题名称',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '主题'
            }, {
                value: JSON.stringify({
                    name: 'inlay_coin',
                    columns: [{
                        prop: 'coin_id',
                        label: '徽章编号',
                        width: 180
                    }, {
                        prop: 'coin_name',
                        label: '徽章名称',
                        width: 180
                    }, {
                        prop: 'lucky_sum',
                        label: '幸运值',
                        width: 180
                    }, {
                        prop: 'img_url',
                        label: '徽章图片',
                        width: 180
                    }, {
                        prop: 'theme_id',
                        label: '所属系列',
                        width: 180
                    }, {
                        prop: 'coin_level',
                        label: '徽章等级',
                        width: 180
                    }, {
                        prop: 'publish_sum',
                        label: '发行量',
                        width: 180
                    }, {
                        prop: 'publish_price',
                        label: '发行价格',
                        width: 180
                    }, {
                        prop: 'instore_sum',
                        label: '商城保有量',
                        width: 180
                    }, {
                        prop: 'inpool_sum',
                        label: '奖池保有量',
                        width: 180
                    }, {
                        prop: 'online_sum',
                        label: '线上持有量',
                        width: 180
                    }, {
                        prop: 'offline_sum',
                        label: '线下持有量',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '徽章类型'
            }, {
                value: JSON.stringify({
                    name: 'inlay_order',
                    columns: [{
                        prop: 'order_id',
                        label: '订单编号',
                        width: 180
                    }, {
                        prop: 'specie_id',
                        label: '徽章id',
                        width: 180
                    }, {
                        prop: 'user_id',
                        label: '用户id',
                        width: 180
                    }, {
                        prop: 'seller_id',
                        label: '卖家id',
                        width: 180
                    }, {
                        prop: 'order_status',
                        label: '订单状态',
                        width: 180
                    }, {
                        prop: 'order_pic',
                        label: '交易快照',
                        width: 180
                    }, {
                        prop: 'order_type',
                        label: '订单类型',
                        width: 180
                    }, {
                        prop: 'order_sum',
                        label: '订单金额',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '订单'
            }, {
                value: JSON.stringify({
                    name: 'inlay_withdraw',
                    columns: [{
                        prop: 'withdraw_id',
                        label: '订单编号',
                        width: 180
                    }, {
                        prop: 'specie_id',
                        label: '徽章id',
                        width: 180
                    }, {
                        prop: 'user_id',
                        label: '用户id',
                        width: 180
                    }, {
                        prop: 'withdraw_status',
                        label: '提现状态',
                        width: 180
                    }, {
                        prop: 'logistics_id',
                        label: '物流id',
                        width: 180
                    }, {
                        prop: 'withdraw_pic',
                        label: '提现快照',
                        width: 180
                    }, {
                        prop: 'logistics_address',
                        label: '提现地址',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '提现'
            }, {
                value: JSON.stringify({
                    name: 'inlay_specie',
                    columns: [{
                        prop: 'specie_key',
                        label: '徽章唯一密钥',
                        width: 180
                    }, {
                        prop: 'specie_id',
                        label: '徽章id',
                        width: 180
                    }, {
                        prop: 'coin_id',
                        label: '徽章类型',
                        width: 180
                    }, {
                        prop: 'user_id',
                        label: '持有用户id',
                        width: 180
                    }, {
                        prop: 'deal_path',
                        label: '流转轨迹',
                        width: 180
                    }, {
                        prop: 'specie_status',
                        label: '徽章状态',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '徽章个体'
            }, {
                value: JSON.stringify({
                    name: 'inlay_msg',
                    columns: [{
                        prop: 'msg_id',
                        label: '消息id',
                        width: 180
                    }, {
                        prop: 'specie_id',
                        label: '徽章id',
                        width: 180
                    }, {
                        prop: 'from_id',
                        label: '发送人',
                        width: 180
                    }, {
                        prop: 'to_id',
                        label: '接收人',
                        width: 180
                    }, {
                        prop: 'msg_type',
                        label: '消息类型',
                        width: 180
                    }, {
                        prop: 'msg_content',
                        label: '消息内容',
                        width: 180
                    }, {
                        prop: 'msg_status',
                        label: '消息状态',
                        width: 180
                    }, {
                        prop: 'is_delete',
                        label: '是否删除',
                        width: 180
                    }, {
                        prop: 'msg_pic',
                        label: '消息快照',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '消息'
            }, {
                value: JSON.stringify({
                    name: 'inlay_collect',
                    columns: [{
                        prop: 'collect_id',
                        label: '收藏id',
                        width: 180
                    }, {
                        prop: 'coin_id',
                        label: '徽章类型id',
                        width: 180
                    }, {
                        prop: 'user_id',
                        label: '用户id',
                        width: 180
                    }, {
                        prop: 'is_delete',
                        label: '是否删除',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '收藏'
            }, {
                value: JSON.stringify({
                    name: 'inlay_reserve',
                    columns: [{
                        prop: 'reserve_id',
                        label: '收藏id',
                        width: 180
                    }, {
                        prop: 'coin_id',
                        label: '徽章类型id',
                        width: 180
                    }, {
                        prop: 'user_id',
                        label: '用户id',
                        width: 180
                    }, {
                        prop: 'is_delete',
                        label: '是否删除',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '预约'
            }]
        }, {
            label: 'Bible',
            options: [{
                value: JSON.stringify({
                    name: 'bgroup',
                    columns: [{
                        prop: 'bgroup_name',
                        label: '小组名称',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }, {
                        prop: 'bgroup_member',
                        label: '小组成员'
                    }]
                }),
                label: '小组'
            }]
        }, {
            label: 'Gker',
            options: [{
                value: JSON.stringify({
                    name: 'user',
                    columns: [{
                        prop: 'user_name',
                        label: '用户名称',
                        width: 180
                    }, {
                        prop: 'user_password',
                        label: '密码'
                    }, {
                        prop: 'user_tags',
                        label: '用户标签'
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '用户'
            }, {
                value: JSON.stringify({
                    name: 'tag',
                    columns: [{
                        prop: 'tag_label',
                        label: '标签名称',
                        width: 180
                    }, {
                        prop: 'tag_keyword',
                        label: '标签关键词',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '标签'
            }]
        }, {
            label: 'Venus',
            options: [{
                value: JSON.stringify({
                    name: 'venus_user',
                    columns: [{
                        prop: 'user_id',
                        label: '用户id',
                        width: 180
                    }, {
                        prop: 'user_type',
                        label: '用户类型',
                        width: 180
                    }, {
                        prop: 'user_name',
                        label: '用户名称',
                        width: 180
                    }, {
                        prop: 'user_phone',
                        label: '手机号码',
                        width: 180
                    }, {
                        prop: 'wechat_id',
                        label: '微信号',
                        width: 180
                    }, {
                        prop: 'invite_id',
                        label: '邀请码',
                        width: 180
                    }, {
                        prop: 'user_info',
                        label: '用户信息'
                    }, {
                        prop: 'user_require',
                        label: '用户需求'
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '用户'
            }, {
                value: JSON.stringify({
                    name: 'venus_admin',
                    columns: [{
                        prop: 'admin_id',
                        label: '管理员id',
                        width: 180
                    }, {
                        prop: 'admin_name',
                        label: '管理员名称',
                        width: 180
                    }, {
                        prop: 'admin_phone',
                        label: '手机号码',
                        width: 180
                    }, {
                        prop: 'wechat_id',
                        label: '微信号',
                        width: 180
                    }, {
                        prop: 'invite_id',
                        label: '邀请码'
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '管理员'
            }, {
                value: JSON.stringify({
                    name: 'venus_collect',
                    columns: [{
                        prop: 'collect_id',
                        label: '记录id',
                        width: 180
                    }, {
                        prop: 'user_id',
                        label: '收藏用户',
                        width: 180
                    }, {
                        prop: 'collected_user_id',
                        label: '被收藏用户',
                        width: 180
                    }, {
                        prop: 'is_delete',
                        label: '是否删除',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '收藏记录'
            }, {
                value: JSON.stringify({
                    name: 'venus_date',
                    columns: [{
                        prop: 'date_id',
                        label: '约会id',
                        width: 180
                    }, {
                        prop: 'from_user_id',
                        label: '发起用户',
                        width: 180
                    }, {
                        prop: 'to_user_id',
                        label: '被约会用户',
                        width: 180
                    }, {
                        prop: 'status',
                        label: '状态',
                        width: 180
                    }, {
                        prop: 'create_time',
                        label: '创建时间'
                    }, {
                        prop: 'update_time',
                        label: '更新时间'
                    }]
                }),
                label: '约会'
            }]
        }]
    }))
}

module.exports = global_api_loader