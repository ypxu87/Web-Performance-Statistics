const tools = require('../common/tools');
/**
 * 检测是否登录
 */
let isLogin = exports.isLogin = async function (ctx, next) {
    let body = tools.trimObjectValue(ctx.request.body);
    if(!ctx.state.current_user && ctx.state.current_user.token != body.token) {
        return ctx.error("您还未登录，请登录后重试！");
    }
    await next();
}