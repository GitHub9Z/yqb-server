const Koa = require('koa2')
const api_loader = require('./api')

// 路由
const route = require('koa-route')
const serve = require("koa-static")
const cors = require('koa2-cors')
const token_check = require('./token_check')
const bodyParser = require('koa-bodyparser')

Koa.prototype.$route = route
const app = new Koa()
Koa.prototype.user_pool = []
app.use(bodyParser())
app.use(cors())
app.use(token_check)

api_loader(app)

app.listen(824)