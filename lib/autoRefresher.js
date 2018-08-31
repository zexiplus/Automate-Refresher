const cp = require('child_process')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const log = console.log


let chromixServer = cp.exec(`${path.join(__dirname, '../node_modules/.bin/chromix-server')}`)

process.stdout.setEncoding('utf8')
// chromixServer.stdout.pipe(process.stdout)
chromixServer.stderr.pipe(process.stderr)


log(chalk.green('键入') + chalk.yellow('quit') + chalk.green('退出\n'))

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
    let input = process.stdin.read()
    if (input !== null && input.indexOf('quit') === 0) {
        process.exit()
    } else if (input !== null) {
        log(chalk.red('无效命令, 请重新输入'))
    }
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
            let command = `${path.join(__dirname, '../node_modules/.bin/chromix')} with ${opt.url} reload`
            cp.exec(command).stdout.pipe(process.stdout)
        })
        
    }
}

module.exports = autoRefresher
