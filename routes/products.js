const router = require('koa-router')();
const querystring = require('querystring');
const validator = require('validator');
const sign = require('../middlewares/sign');
const tools = require('../common/tools');

/**
 *获取产品信息列表
 */
router.get('/products/list',sign.isLogin,async function (ctx,next) {
    if (!ctx.req._parsedUrl.query) {
        ctx.body = "参数错误";
        return;
    }
    var params = querystring.parse(ctx.req._parsedUrl.query);
    let Products = ctx.model("product")
    let list = await Products.getProducts(params.auth_id)
    if(list){
        return ctx.body={
            success:"success",
            data:list
        }
    }else{
        return ctx.body={
            success:"failed",
            msg:"没有注册任何！"
        }
    }
})

/**
*新增产品
*/
router.post('/product/create',sign.isLogin,async function (ctx,next) {
    let body = tools.trimObjectValue(ctx.request.body);
    if(!validator.isURL(body.url)){
        return ctx.body={
            success:"failed",
            msg:"url格式不正确，请检查后重试！"
        }
    }
    if(body.auth_id!=ctx.state.current_user._id){
        return ctx.body={
            success:"failed",
            msg:"用户id错误，请检查后重试！"
        }
    }
    if(!body.product_name){
        return ctx.body={
            success:"failed",
            msg:"产品名称不能为空！"
        }
    }
    let Product = ctx.model("product")
    let product = new Product(body)
    let result = await product.save()
    if(result){
        return ctx.body={
            success:"success",
            data:result
        }
    }else{
        return ctx.body={
            success:"failed",
            msg:"注册产品失败！"
        }
    }
})

module.exports = router;