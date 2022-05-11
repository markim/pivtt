import { CliUx, Command, Flags } from '@oclif/core'
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

  static flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({
      char: 'f',
      default: false,                // default value if flag not passed (can be a function that returns a boolean)
      // boolean flags may be reversed with `--no-` (in this case: `--no-force`).
      // The flag will be set to false if reversed. This functionality
      // is disabled by default, to enable it:
      // allowNo: true
    }),
  }

  static args = [{ name: 'folder', default: '.', required: false }]

  public async run(): Promise<void> {
    //
    const { flags, args } = await this.parse(Utf8)
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
          CliUx.ux.action.start(entry, 'initializing', { stdout: true })
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
        if (flags.force) {
          readTree(args.folder)
        } else {
          const response = await CliUx.ux.prompt(`Are you ready to convert all files in: ${args.folder} to UTF-8? (y/n)`)
          if (response === 'y' || response === 'Y') {
            readTree(args.folder)
          }
        }
      } else {
        this.log('Must provide directory, not a file')
      }
    } catch {
      this.log('Not a valid folder')
    }
  }
}
