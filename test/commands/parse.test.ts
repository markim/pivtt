import { expect, test } from '@oclif/test'

describe('parse', () => {
  test
    .stdout()
    .command(['parse', './test/files/goodtest.vtt'])
    .it('runs parse on valid vtt file', (ctx) => {
      expect(ctx.stdout).to.contain('[]')
    })
  test
    .stdout()
    .command(['parse', './test/files/badtest.vtt'])
    .it('runs parse on invalid vtt file', (ctx) => {
      expect(ctx.stdout).to.contain('Milliseconds must be given in three digits.')
    })
  test
    .stdout()
    .command(['parse', './test/files/wrongext.txt'])
    .it('runs parse on incorrect file extension', (ctx) => {
      expect(ctx.stdout).to.contain('Skipping')
    })
})
