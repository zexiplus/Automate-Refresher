const path = require('path')

// 默认的配置文件
const config = {
    path: path.resolve(__dirname, './demo'), // 监控变化的web目录
    index: 0, // 刷新浏览器tab页索引 第一页为 0
    deep: true // 是否深度监控
}
module.exports = config