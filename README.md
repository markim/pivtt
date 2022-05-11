pivtt
=================

[![Version](https://img.shields.io/npm/v/pivtt.svg)](https://npmjs.org/package/pivtt)
[![License](https://img.shields.io/npm/l/pivtt.svg)](https://github.com/markim/pivtt/package.json)

pivtt is a command line tool to clean up .vtt files

----

The flow for a new release:

1.) Make changes to the code

2.) `yarn build`

3.) `yarn readme`

4.) `yarn changelog`

5.) `git push`

6.) `yarn release`


# Table of Contents
<!-- toc -->
* [Table of Contents](#table-of-contents)
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
pivtt/0.0.4 win32-x64 node-v16.15.0
$ pivtt --help [COMMAND]
USAGE
  $ pivtt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pivtt help [COMMAND]`](#pivtt-help-command)
* [`pivtt utf8 [FILE]`](#pivtt-utf8-file)

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

## `pivtt utf8 [FILE]`

describe the command here

```
USAGE
  $ pivtt utf8 [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ pivtt utf8
```

_See code: [dist/commands/utf8.ts](https://github.com/markim/pivtt/blob/v0.0.4/dist/commands/utf8.ts)_
<!-- commandsstop -->
