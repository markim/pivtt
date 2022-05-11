import { CliUx, Command, Flags } from '@oclif/core'
const { WebVTTParser } = require('webvtt-parser')
import fs = require('fs')
import path = require('path')

export default class Parse extends Command {
  static description = 'This command looks at a .vtt file and parses it'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
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

  static args = [{ name: 'fileOrFolder', require: true }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Parse)

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
        } else if (path.extname(entry) === '.vtt') {
          // start the spinner
          CliUx.ux.action.start(entry, 'initializing', { stdout: true })
          // perform the validation on this file here
          // assume utf-8 encoding so we can open the file and get the raw text
          //
          const content = fs.readFileSync(entry, { encoding: 'utf-8' })
          const parser = new WebVTTParser()
          const tree = parser.parse(content, 'metadata')

          this.log(tree.errors)
          //
          // stop the spinner
          CliUx.ux.action.stop() // shows 'starting a process... done'
        } else {
          this.log(`Skipping ${entry} because it is not a VTT file`)
        }
      })
    }

    //
    try {
      const stats = fs.statSync(args.fileOrFolder)
      if (stats.isDirectory()) {
        if (flags.force) {
          readTree(args.fileOrFolder)
        } else {
          const response = await CliUx.ux.prompt(`Are you ready to validate all .vtt files in: ${args.fileOrFolder} to UTF-8? (y/n)`)
          if (response === 'y' || response === 'Y') {
            readTree(args.fileOrFolder)
          }
        }
      } else if (path.extname(args.fileOrFolder) === '.vtt') {
        // perform the conversion on this file here
        //
        // start the spinner
        CliUx.ux.action.start(args.fileOrFolder, 'initializing', { stdout: true })
        // perform the validation on this file here
        //
        const content = fs.readFileSync(args.fileOrFolder, { encoding: 'utf-8' })
        const parser = new WebVTTParser()
        const tree = parser.parse(content, 'metadata')
        this.log(tree.errors)
        //
        // stop the spinner
        CliUx.ux.action.stop() // shows 'starting a process... done'
      } else {
        this.log(`Skipping ${args.fileOrFolder} because it is not a VTT file`)
      }
    } catch {
      this.log('Not a valid folder or file path')
    }
  }
}
