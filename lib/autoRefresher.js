const cp = require('child_process')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const os = require('os')

const log = console.log

let chromixServerCommand
if (os.platform() === 'win32') {
    chromixServerCommand = `${path.join(__dirname, '../node_modules/.bin/chromix-server')}`
} else {
    chromixServerCommand = `${path.join(__dirname, '../node_modules/.bin/chromix-too-server')}`
}

let chromixServer = cp.exec(chromixServerCommand)
process.stdout.setEncoding('utf8')
chromixServer.stdout.pipe(process.stdout)
chromixServer.stderr.pipe(process.stderr)


log(chalk.green('Auto-Refresher') + chalk.yellow(' started!'))

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
    let input = process.stdin.read()
})

process.on('beforeExit', () => {
    log('beforeExit')
})
process.on('exit', code => {
    log(`process exit ${code} \n`)
    process.kill(chromixServer.pid)
})

const autoRefresher = {
    inspect(opt) {
        const watchOption = {
            encoding: 'utf8',
        }
        Object.assign(opt.watchOption, watchOption)
        fs.watch(opt.path, opt.watchOption, (event, filename) => {
            log(chalk.green(filename), chalk.yellow(event))
            let command
            if (os.platform === 'win32') {
                command = `${path.join(__dirname, '../node_modules/.bin/chromix')} with ${opt.url} reload`
            } else {
                command = `${path.join(__dirname, '../node_modules/.bin/chromix-too')} reload ${opt.url}`
            }
            log(command)
            cp.exec(command).stdout.pipe(process.stdout)
        })
        
    }
}

module.exports = autoRefresher
