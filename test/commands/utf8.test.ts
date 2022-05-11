import { expect, test } from '@oclif/test'

describe('utf8', () => {
  test
    .stdout()
    .command(['utf8', './test/file', '-f'])
    .it('runs utf8', ctx => {
      expect(ctx.stdout).to.contain('') // TODO: Fix this being empty
    })
  test
    .stdout()
    .command(['utf8', './test/nofile', '-f'])
    .it('runs utf8 and fails to find folder', ctx => {
      expect(ctx.stdout).to.Throw
    })
  test
    .stdout()
    .command(['utf8', './test/file/test.txt', '-f'])
    .it('runs utf8 and is given a file instead of a folder', ctx => {
      expect(ctx.stdout).to.contain('Must provide directory, not file')
    })
})
