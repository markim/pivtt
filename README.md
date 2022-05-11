pivtt
=================

[![Version](https://img.shields.io/npm/v/pivtt.svg)](https://npmjs.org/package/pivtt)
[![License](https://img.shields.io/npm/l/pivtt.svg)](https://github.com/markim/pivtt/package.json)

pivtt is a command line tool to clean up .vtt files

----

## Table of contents
<!-- toc -->
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
pivtt/0.0.11 win32-x64 node-v16.15.0
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

This command looks at a .vtt file and parses it

```
USAGE
  $ pivtt parse [FILEORFOLDER] [-f]

FLAGS
  -f, --force

DESCRIPTION
  This command looks at a .vtt file and parses it

EXAMPLES
  $ pivtt parse
```

_See code: [dist/commands/parse.ts](https://github.com/markim/pivtt/blob/v0.0.11/dist/commands/parse.ts)_

## `pivtt utf8 [FILEORFOLDER]`

Convert every file in the current directory to UTF-8 encoding

```
USAGE
  $ pivtt utf8 [FILEORFOLDER] [-f]

FLAGS
  -f, --force

DESCRIPTION
  Convert every file in the current directory to UTF-8 encoding

EXAMPLES
  $ pivtt utf8

  Are you ready to convert all files in: .\test\ to UTF-8? (y/n): y
      test\tsconfig.json... done
      test\commands\utf8.test.ts... done
      test\helpers\init.js... done
```

_See code: [dist/commands/utf8.ts](https://github.com/markim/pivtt/blob/v0.0.11/dist/commands/utf8.ts)_
<!-- commandsstop -->
