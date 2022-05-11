import { expect, test } from '@oclif/test'

describe('utf8', () => {
  test
    .stdout()
    .command(['utf8'])
    .it('runs utf8', ctx => {
      expect(ctx.stdout).to.contain('Finished converting')
    })
})
