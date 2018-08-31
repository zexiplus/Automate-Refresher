const autoRefresher = require('./lib/autoRefresher')
const config = require('./config')

let opt = {
    path: process.argv[2] || config.path,
    url: process.argv[3] || config.url,
    watchOption: { recursive: process.argv[4] == 1 || config.deep }
}

autoRefresher.inspect(opt)