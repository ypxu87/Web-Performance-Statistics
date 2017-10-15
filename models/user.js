/**
 * 用户模型
 */
const mongoose = require('mongoose');
const crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    username : { type: String, required: true},
    password : { type: String, required: true},
    email : { type: String, required: true},
    product_count : { type: Number, default: 0 },
    notice_count : { type: Number, default: 0 },
    create_time: { type: Date, default: Date.now }
})

UserSchema.set('toObject',{getter:true,virtuals:true});
UserSchema.index({username:1},{unique:true});

/**
 * 写入password时对其加密
 */
UserSchema.path('password').set(function (v) {
    return crypto.createHash('md5').update(v).digest('base64');
})

/**
 * 验证登录密码
 */
UserSchema.statics.check_password = async function (username,password) {
    let user = await this.findOne({
        username: username,
        password: crypto.createHash('md5').update(password).digest('base64')
    })
    return user;
}

/**
 * 增加或减少产品的数量
 */
UserSchema.statics.updateProductCount = async function (userId,num) {
    let user = await this.findOne({_id:userId});
    user.product_count += num;
    user.save();
    return user;
}
/**
 * 增加或减少通知数量
 * */
UserSchema.statics.updateNoticeCount = async function (userId,num) {
    let user = await this.findOne({_id:userId});
    user.notice_count += num;
    user.save();
    return user;
}

module.exports = UserSchema;