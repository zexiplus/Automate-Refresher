#!/usr/bin/env node

const programe = require('commander')
const version = require('../package').version
programe.version(version, '--version')

const autoRefresher = require('../lib/autoRefresher')
const config = require('../config')

let opt = {
    path: process.argv[2] || config.path,
    index: process.argv[3] || config.index,
    watchOption: {
        recursive: process.argv[4] == 1 || config.deep
    }
}

programe
    .command('autorefresh')
    .action(() => {
        autoRefresher.inspect(opt)
    })


