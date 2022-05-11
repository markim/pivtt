pivtt
=================



[![Version](https://img.shields.io/npm/v/pivtt.svg)](https://npmjs.org/package/pivtt)
[![License](https://img.shields.io/npm/l/pivtt.svg)](https://github.com/markim/pivtt/package.json)

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
pivtt/0.0.0 win32-x64 node-v16.15.0
$ pivtt --help [COMMAND]
USAGE
  $ pivtt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pivtt help [COMMAND]`](#pivtt-help-command)
* [`pivtt update [CHANNEL]`](#pivtt-update-channel)
* [`pivtt utf8`](#pivtt-utf8)

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

## `pivtt utf8`

Convert files to UTF-8

```
USAGE
  $ pivtt utf8

DESCRIPTION
  Convert files to UTF-8

EXAMPLES
  $ pivtt utf8
  $ pivtt starting utf-8 conversion...
```

_See code: [dist/commands/utf8/index.ts](https://github.com/markim/pivtt/blob/v0.0.0/dist/commands/utf8/index.ts)_
<!-- commandsstop -->
