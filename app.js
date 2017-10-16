const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')();
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const convert = require('koa-convert')
const session = require('koa-generic-session')
const config = require('./config');
const redisStore = require('koa-redis');

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)
app.keys = ['webux'];
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(convert(session({
    store: redisStore(config.redis)
})));
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(async function (ctx,next) {
    if(ctx.session.user) {
        ctx.state.current_user = ctx.session.user;
    }
    await next()
})
//绑定mongodb
app.use(async (ctx, next) => {
    if(!ctx.model)
        ctx.model = require('./models');
    await next();
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
