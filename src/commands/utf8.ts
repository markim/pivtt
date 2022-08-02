import { CliUx, Command, Flags } from '@oclif/core'
import fs = require('fs')
import path = require('path')

export default class Utf8 extends Command {
  static description = 'This will convert a single .vtt file, or all .vtt files in a folder to UTF-8 encoding'

  static examples = [
    '<%= config.bin %> <%= command.id %> ./test/files',
    `Are you ready to convert all files in: ./test/files to UTF-8? (y/n): y
    test\\files\\badtest.vtt... done
    Skipping test\\files\\wrongext.txt because it is not a VTT file
    test\\files\\goodtest.vtt... done`,
  ]

  static flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({
      char: 'f',
      default: false, // default value if flag not passed (can be a function that returns a boolean)
      // boolean flags may be reversed with `--no-` (in this case: `--no-force`).
      // The flag will be set to false if reversed. This functionality
      // is disabled by default, to enable it:
      // allowNo: true
      hidden: true,
    }),
  }

  static args = [{ name: 'fileOrFolder', default: '.', required: false }]

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
        } else if (path.extname(entry) === '.vtt') {
          // start the spinner
          CliUx.ux.action.start(entry, 'initializing', { stdout: true })
          // perform the conversion on this file here
          //
          const content = fs.readFileSync(entry)
          fs.writeFileSync(entry, content, { encoding: 'utf8' }) // specify the encoding as utf8
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
          const response = await CliUx.ux.prompt(
            `Are you ready to convert all *.vtt files in: ${args.fileOrFolder} to UTF-8? (y/n)`
          )
          if (response === 'y' || response === 'Y') {
            readTree(args.fileOrFolder)
          }
        }
      } else if (path.extname(args.fileOrFolder) === '.vtt') {
        // perform the conversion on this file here
        //
        // start the spinner
        CliUx.ux.action.start(args.fileOrFolder, 'initializing', { stdout: true })
        // perform the conversion on this file here
        //
        const content = fs.readFileSync(args.fileOrFolder)
        fs.writeFileSync(args.fileOrFolder, content, { encoding: 'utf8' }) // specify the encoding as utf8
        //
        // stop the spinner
        CliUx.ux.action.stop() // shows 'starting a process... done'
      } else {
        this.log(`Skipping ${args.fileOrFolder} because it is not a VTT file`)
      }
    } catch {
      this.log('Error while converting to utf8')
    }
  }
}
