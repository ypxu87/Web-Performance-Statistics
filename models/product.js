/**
 * 产品模型
 */
const mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    product_name : { type: String, required: true},
    create_time : { type: Date, default: Date.now },
    description : { type: String, default: "没有信息"},
    url : { type: String, required: true},
    auth_id : { type: String, required: true },
})

ProductSchema.set('toObject',{getter:true,virtuals:true});

/**
 * 验证登录密码
 */
ProductSchema.statics.getProducts = async function (authId) {
    let products = await this.find({
        auth_id: authId,
    })
    return products;
}

/**
 * 删除产品
 */
ProductSchema.statics.createProduct = async function (authId,productId) {
    let product = new this(productInfo);
    let result = await this.remove({_id:productId});
    if(result){
        return true;
    }else{
        return false;
    }
}
/**
 * 修改产品信息
 * */
ProductSchema.statics.updateNoticeCount = async function (productInfo) {
    let product = await this.findOne({_id:productInfo._id});
    if(!product){
        return false
    }
    product.product_name = productInfo.product_name;
    product.description = productInfo.description;

    let result = await product.save();
    if(result){
        return result
    }else{
        return false
    }
}

module.exports = ProductSchema;