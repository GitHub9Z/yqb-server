const Koa = require('koa2')
const api_loader = require('./api')
const https = require('https')
const fs = require('fs')
const sslify = require('koa-sslify').default
const serve = require("koa-static")

// 路由
const route = require('koa-route')
const cors = require('koa2-cors')
const token_check = require('./token_check')
const compress = require('koa-compress');
const gzip_opt = { threshold: 2048 };
const bodyParser = require('koa-bodyparser')


const options = {
  key: fs.readFileSync('./key/9259507_www.imgker.com.key'),
  cert: fs.readFileSync('./key/9259507_www.imgker.com.pem'),
}
   

Koa.prototype.$route = route
const app = new Koa()
Koa.prototype.user_pool = []
app.use(compress(gzip_opt))
app.use(serve(__dirname + "/pages"))
app.use(sslify())
app.use(bodyParser())
app.use(cors())
app.use(token_check)
api_loader(app)

https.createServer(options, app.callback()).listen(443, (err) => {
    if (err) {
      console.log('服务启动出错', err);
    } else {
      console.log('成功');
    }	
})