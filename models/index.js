const mongoose =  require('mongoose-q')(require('mongoose'));
const UserSchema = require('./user');
const ProductSchema = require('./product')
const config = require('../config');

// 数据库
require('mongoose').Promise = global.Promise

let mongodb = `mongodb://${config.mongodb.host}/${config.mongodb.database}`
if(config.mongodb.user)
    mongodb = `mongodb://${config.mongodb.user}:${config.mongodb.pass}@${config.mongodb.host}/${config.mongodb.database}`
mongoose.connect(mongodb, {
    server: {
        poolSize: 10
    }
}, (err) => {
    if(err) {
        console.error(err);
    }
});

mongoose.model('user', UserSchema);
mongoose.model('product', ProductSchema);
module.exports = function (name) {
    name = name.toLowerCase();
    return mongoose.model(name);
}