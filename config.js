const path = require('path')
const os = require('os')

let url
if (os.platform() === 'win32') {
    url = 'file:///' + path.resolve(__dirname, './demo/index.html').replace(/\\/g, '/')
} else {
    url = 'file://' + path.resolve(__dirname, './demo/index.html')
}

const config = {
    path: path.resolve(__dirname, './demo'),
    url: url,
    deep: true
}
module.exports = config