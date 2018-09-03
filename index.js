const autoRefresher = require('./lib/autoRefresher')
const config = require('./config')

let opt = {
    path: process.argv[2] || config.path,
    index: process.argv[3] || config.index,
    watchOption: { recursive: process.argv[4] == 1 || config.deep }
}

autoRefresher.inspect(opt)