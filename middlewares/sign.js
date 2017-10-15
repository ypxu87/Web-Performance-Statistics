/**
 * 检测是否登录
 */
let isLogin = exports.isLogin = async function (ctx, next) {
    if(!ctx.state.current_user) {
        return ctx.error("您还未登录，请登录后重试！");
    }
    await next();
}