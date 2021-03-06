const cp = require('child_process')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const os = require('os')
const { Writable } = require('stream')
const log = console.log




const autoRefresher = {
    execChromix() {
        // 启动chromix服务
        let chromixServerCommand
        if (os.platform() === 'win32') {
            chromixServerCommand = `${path.join(__dirname, '../node_modules/.bin/chromix-server')}`
        } else {
            chromixServerCommand = `${path.join(__dirname, '../node_modules/.bin/chromix-too-server')}`
        }

        // 把chromix的输出输入到标准输出流
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
    },
    inspect(opt) {
        const watchOption = {
            encoding: 'utf8',
        }
        // 合并配置项
        Object.assign(opt.watchOption, watchOption)
        fs.watch(opt.path, opt.watchOption, (event, filename) => {
            // 打印 变更 的文件名
            log(chalk.green(filename), chalk.yellow(event))

            let reloadCommand, listCommand
            if (os.platform() === 'win32') {
                listCommand = `${path.join(__dirname, '../node_modules/.bin/chromix')} list`
            } else {
                listCommand = `${path.join(__dirname, '../node_modules/.bin/chromix-too')} list`
            }

            let chromixListStream = cp.exec(listCommand)
            let str, bowserList
            chromixListStream.stdout.on('data', (data) => {
                str += data
            })
            chromixListStream.stdout.on('end', () => {
                if (str !== undefined) {
                    bowserList = str.toString().match(/\d+\s/g)
                    if (os.platform() === 'win32') {
                        reloadCommand = `${path.join(__dirname, '../node_modules/.bin/chromix')} with ${bowserList[opt.index]} reload`
                    } else {
                        reloadCommand = `${path.join(__dirname, '../node_modules/.bin/chromix-too')} reload ${bowserList[opt.index]}`
                    }
                    cp.exec(reloadCommand).stdout.pipe(process.stdout)
                } 
            })
            
            class MyWritable extends Writable {
                constructor(options) {
                    super(options);
                }
                _write(chunk, encoding, callback) {
                    callback()
                }
            }
            const writableStream = new MyWritable()
            chromixListStream.stdout.pipe(writableStream)
        })    
    }
}

module.exports = autoRefresher