import { Command } from '@oclif/core'
import fs = require('fs')
import path = require('path')

export default class Utf8 extends Command {
  static description = 'Convert every file in the current directory to UTF-8 encoding'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    'Currently the command will only list all files in a directory recursively',
  ]

  static flags = {}

  static args = [{ name: 'folder', default: '.', required: false }]

  public async run(): Promise<void> {
    //
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
          // perform the conversion on this file here
          this.log(entry)
        }
      })
    }

    //
    readTree('.')
    this.log('Finished converting files from /pivtt/src/commands/utf8.ts')
  }
}
