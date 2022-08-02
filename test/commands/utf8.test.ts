import { expect, test } from '@oclif/test'

describe('utf8', () => {
  test
    .stdout()
    .command(['utf8', './test/files', '-f'])
    .it('runs utf8', (ctx) => {
      expect(ctx.stdout).to.contain('')
    })
  test
    .stdout()
    .command(['utf8', './test/wrongfolder', '-f'])
    .it("runs utf8 and fails to find folder that doesn't exist", (ctx) => {
      expect(ctx.stdout).to.Throw
    })
  test
    .stdout()
    .command(['utf8', './test/files/wrongext.txt', '-f'])
    .it('runs utf8 and is given a file', (ctx) => {
      expect(ctx.stdout).to.contain('Skipping')
    })
})
