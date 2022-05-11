import { Command } from '@oclif/core'

export default class UTF8 extends Command {
  static description = 'Convert files to UTF-8'

  static examples = [
    `$ pivtt utf8
pivtt starting utf-8 conversion...
`,
  ]

  static flags = {
    // from: Flags.string({char: 'f', description: 'Whom is saying hello', required: true}),
  }

  static args = [
    // { name: 'person', description: 'Person to say hello to', required: true }
  ]

  async run(): Promise<void> {
    // const { args, flags } = await this.parse(UTF8)

    // this.log(`pivtt ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`)
    this.log('pivtt starting utf-8 conversion...')
  }
}
