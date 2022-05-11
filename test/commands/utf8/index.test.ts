import { expect, test } from '@oclif/test'

describe('hello', () => {
  test
    .stdout()
    .command(['utf8'])
    .it('runs utf8 cmd', ctx => {
      expect(ctx.stdout).to.contain('utf-8')
    })
})
