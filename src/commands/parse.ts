import { CliUx, Command, Flags } from '@oclif/core'
// eslint-disable-next-line unicorn/prefer-module
const { WebVTTParser } = require('webvtt-parser')
import fs = require('fs')
import path = require('path')
const outputFile = './validation-results.txt'

export default class Parse extends Command {
  static description =
    'This will validate a single .vtt file, or all .vtt files in a folder with the webvtt-parser library'

  static examples = [
    '<%= config.bin %> <%= command.id %> ./test/files',
    `
[]
test\\files\\goodtest.vtt... done
Skipping test\\files\\wrongext.txt because it is not a VTT file
[
  {
    message: 'Milliseconds must be given in three digits.',
    line: 3,
    col: 33
  },
  {
    message: 'Milliseconds must be given in three digits.',
    line: 6,
    col: 33
  }
]
test\\files\\badtest.vtt... done`,
  ]

  static flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({
      char: 'f',
      default: false,
      // default value if flag not passed (can be a function that returns a boolean)
      // boolean flags may be reversed with `--no-` (in this case: `--no-force`).
      // The flag will be set to false if reversed. This functionality
      // is disabled by default, to enable it:
      // allowNo: true
      hidden: true,
    }),
    // flag with no value (-f, --force)
    output: Flags.boolean({
      description: 'adding -o will output a file called validation-results.txt',
      char: 'o',
      default: false,
      required: false,
      // default value if flag not passed (can be a function that returns a boolean)
      // boolean flags may be reversed with `--no-` (in this case: `--no-force`).
      // The flag will be set to false if reversed. This functionality
      // is disabled by default, to enable it:
      // allowNo: true
      name: 'Output to validation-results.txt',
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

          if (flags.output) {
            let fileIssues = `\n\nFile: ${entry}`
            fileIssues += `\n    ${tree.errors.length} Errors`
            for (const element of tree.errors) {
              fileIssues += '\n    ============================='
              fileIssues += `\n    = - Message: ${element.message}`
              fileIssues += `\n    = - Line: ${element.line}`
              fileIssues += `\n    = - Column: ${element.col}`
            }

            fs.writeFileSync(outputFile, fileIssues, { flag: 'a' })
          } else {
            this.log(tree.errors)
          }

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
      if (flags.output) {
        const absolutePath = path.resolve(args.fileOrFolder)
        fs.writeFileSync(outputFile, `Validation results for: ${absolutePath}`, { encoding: 'utf-8' })
      }

      const stats = fs.statSync(args.fileOrFolder)

      if (stats.isDirectory()) {
        if (flags.force) {
          readTree(args.fileOrFolder)
        } else {
          const response = await CliUx.ux.prompt(
            `Are you ready to validate all .vtt files in: ${args.fileOrFolder} to UTF-8? (y/n)`
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
        // perform the validation on this file here
        //
        const content = fs.readFileSync(args.fileOrFolder, { encoding: 'utf-8' })
        const parser = new WebVTTParser()
        const tree = parser.parse(content, 'metadata')
        if (flags.output) {
          let fileIssues = `\n\nFile: ${args.fileOrFolder}`
          fileIssues += `\n    ${tree.errors.length} Errors`
          for (const element of tree.errors) {
            fileIssues += '\n    ============================='
            fileIssues += `\n    = - Message: ${element.message}`
            fileIssues += `\n    = - Line: ${element.line}`
            fileIssues += `\n    = - Column: ${element.col}`
          }

          fs.writeFileSync(outputFile, fileIssues, { flag: 'a' })
        } else {
          this.log(tree.errors)
        }
        //
        // stop the spinner

        CliUx.ux.action.stop() // shows 'starting a process... done'
      } else {
        this.log(`Skipping ${args.fileOrFolder} because it is not a VTT file`)
      }
    } catch {
      this.log('Error while parsing')
    }
  }
}
