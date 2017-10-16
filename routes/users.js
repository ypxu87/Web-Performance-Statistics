const router = require('koa-router')();
const validator = require('validator');
const sign = require('../middlewares/sign');
const tools = require('../common/tools');

/**
 *用户注册
 */
router.post('/signup',async function (ctx,next) {
    let body = tools.trimObjectValue(ctx.request.body);
    if(!validator.isEmail(body.email)){
        return ctx.body={
            success:"failed",
            msg:"email格式不正确，请检查后重试！"
        }
    }
    let User = ctx.model("user");
    let user = await User.findOne({
        username:body.username
    });
    if(user){
        return ctx.body={
            success:"failed",
            msg:"用户名已被注册！"
        }
    }
    user = await User.findOne({
        email:body.email
    });
    if(user){
        return ctx.body={
            success:"failed",
            msg:"邮箱已被注册！"
        }
    }

    user = new User(body)
    let result = await user.save();
    if(result){
        return ctx.body={
            success:"success",
            data:body
        }
    }else{
        return ctx.body={
            success:"failed",
            msg:"注册失败！"
        }
    }

})

/**
 * 登录处理
 */
router.post('/login', async (ctx, next) => {
    let body = tools.trimObjectValue(ctx.request.body);
    let User = ctx.model('user');
    let user = await User.check_password(body.username, body.password);

    if(!user) {
        return ctx.body={
            success:"failed",
            msg:"账号或密码错误！"
        };
    }
    // 用户名密码正确
    ctx.session.user = user.toObject();
    var token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
    ctx.session.user.token = token;
    return ctx.body={
        success:"success",
        data:{
            id: ctx.session.user._id,
            username:ctx.session.user.username,
            token:token
        },
    };
});

/**
 * 修改用户信息
 */
router.post('/modify',sign.isLogin,async function (ctx,next) {
    let body = tools.trimObjectValue(ctx.request.body);
    let User = ctx.model('user');
    let user = await User.findOne({username: ctx.state.current_user.username})

    if (!validator.isEmail(body.email)) {
        return ctx.error('email格式不正确，请检查后重试！');
    }

    user.email = body.email;
    let result = await user.save();

    if(result) {
        let token = ctx.session.user.token;
        ctx.session.user = user.toObject();
        ctx.session.user.token = token
        return ctx.body={
            success:"success",
            msg:"修改信息成功！"
        };
    } else {
        return ctx.error('请求失败');
    }
})

module.exports = router;