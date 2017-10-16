/**
 * 系统配置文件
 */

const config = {
    // 数据库连接
    mongodb: {
        user: '',
        pass: '',
        host: '127.0.0.1',
        port: 27017,
        database: 'webux'
    },
    // Redis配置
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
}

module.exports = config;