# pivtt

[![Version](https://img.shields.io/npm/v/pivtt.svg)](https://npmjs.org/package/pivtt)
[![License](https://img.shields.io/npm/l/pivtt.svg)](https://github.com/markim/pivtt/package.json)

pivtt is a command line tool to clean up .vtt files

---

## Table of contents

<!-- toc -->
* [pivtt](#pivtt)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g pivtt
$ pivtt COMMAND
running command...
$ pivtt (--version)
pivtt/0.0.13 win32-x64 node-v18.7.0
$ pivtt --help [COMMAND]
USAGE
  $ pivtt COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`pivtt help [COMMAND]`](#pivtt-help-command)
* [`pivtt parse [FILEORFOLDER]`](#pivtt-parse-fileorfolder)
* [`pivtt update [CHANNEL]`](#pivtt-update-channel)
* [`pivtt utf8 [FILEORFOLDER]`](#pivtt-utf8-fileorfolder)

## `pivtt help [COMMAND]`

Display help for pivtt.

```
USAGE
  $ pivtt help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pivtt.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `pivtt parse [FILEORFOLDER]`

This will validate a single .vtt file, or all .vtt files in a folder with the webvtt-parser library

```
USAGE
  $ pivtt parse [FILEORFOLDER] [-o]

FLAGS
  -o, --output  adding -o will output a file called validation-results.txt

DESCRIPTION
  This will validate a single .vtt file, or all .vtt files in a folder with the webvtt-parser library

EXAMPLES
  $ pivtt parse ./test/files

  []
  test\files\goodtest.vtt... done
  Skipping test\files\wrongext.txt because it is not a VTT file
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
  test\files\badtest.vtt... done
```

_See code: [dist/commands/parse.ts](https://github.com/markim/pivtt/blob/v0.0.13/dist/commands/parse.ts)_

## `pivtt update [CHANNEL]`

update the pivtt CLI

```
USAGE
  $ pivtt update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  update the pivtt CLI

EXAMPLES
  Update to the stable channel:

    $ pivtt update stable

  Update to a specific version:

    $ pivtt update --version 1.0.0

  Interactively select version:

    $ pivtt update --interactive

  See available versions:

    $ pivtt update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_

## `pivtt utf8 [FILEORFOLDER]`

This will convert a single .vtt file, or all .vtt files in a folder to UTF-8 encoding

```
USAGE
  $ pivtt utf8 [FILEORFOLDER]

DESCRIPTION
  This will convert a single .vtt file, or all .vtt files in a folder to UTF-8 encoding

EXAMPLES
  $ pivtt utf8 ./test/files

  Are you ready to convert all files in: ./test/files to UTF-8? (y/n): y
      test\files\badtest.vtt... done
      Skipping test\files\wrongext.txt because it is not a VTT file
      test\files\goodtest.vtt... done
```

_See code: [dist/commands/utf8.ts](https://github.com/markim/pivtt/blob/v0.0.13/dist/commands/utf8.ts)_
<!-- commandsstop -->
