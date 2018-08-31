const path = require('path')
const config = {
    path: path.resolve(__dirname, './demo'),
    url: 'file:///' + path.resolve(__dirname, './demo/index.html').replace(/\\/g, '/'),
    deep: true
}
module.exports = config