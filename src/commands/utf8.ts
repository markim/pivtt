import { CliUx, Command } from '@oclif/core'
import fs = require('fs')
import path = require('path')

export default class Utf8 extends Command {
  static description = 'Convert every file in the current directory to UTF-8 encoding'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    `Are you ready to convert all files in: .\\test\\ to UTF-8? (y/n): y
    test\\tsconfig.json... done
    test\\commands\\utf8.test.ts... done
    test\\helpers\\init.js... done`,
  ]

  static flags = {}

  static args = [{ name: 'folder', default: '.', required: false }]

  public async run(): Promise<void> {
    //
    const { args } = await this.parse(Utf8)
    //
    const readTree = (entry: string) => {
      fs.lstat(entry, (err: any, stat: { isDirectory: () => any }) => {
        if (err) throw err
        if (stat.isDirectory()) {
          fs.readdir(entry, (err: any, files: any[]) => {
            if (err) throw err
            for (const file of files) {
              readTree(path.join(entry, file))
            }
          })
        } else {
          // start the spinner
          CliUx.ux.action.start(entry)
          // perform the conversion on this file here
          //
          const content = fs.readFileSync(entry)
          fs.writeFileSync(entry, content, { encoding: 'utf8' }) // specify the encoding as utf8
          //
          // stop the spinner
          CliUx.ux.action.stop() // shows 'starting a process... done'
        }
      })
    }

    //
    try {
      const stats = fs.statSync(args.folder)
      if (stats.isDirectory()) {
        const response = await CliUx.ux.prompt(`Are you ready to convert all files in: ${args.folder} to UTF-8? (y/n)`)
        if (response === 'y' || response === 'Y') {
          readTree(args.folder)
        }
      } else {
        this.log('Must provide valid directory')
      }
    } catch {
      this.log('Not a valid folder')
    }
  }
}
