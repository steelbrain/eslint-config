// @flow
// from: https://github.com/steelbrain/command/blob/eb63e6591ec53a90502895e3d55e5743a126cc95/src/parser.js
/* eslint-disable import/extensions,import/no-unresolved */

import type { Command, Option, OptionEntry } from './types'

const OPTION_SHORT_MULTI = /^-([a-z0-9]{2,})$/i
const OPTION_COMPRESSED = /^(--[a-z0-9-]+)=(.+)$|^(-[a-z0-9]+)=(.+)$/i

function getOptionByAlias(options: Array<Option>, alias: string, rawParameters: Array<string>): Option {
  const validationPrefix = rawParameters.join('.')
  const foundOption = options.find(
    option => option.aliases.indexOf(alias) !== -1 && (!option.command || validationPrefix.indexOf(option.command) === 0),
  )
  if (foundOption) {
    return foundOption
  }
  throw new Error(`Option ${alias} is not recognized`)
}

function generateError(message: string, parameters: Array<any>): Error {
  const error = new Error(message)
  // $FlowIgnore: Custom prop
  error.parameters = parameters
  return error
}

export default function parse(
  given: Array<string>,
  commands: Array<Command>,
  options: Array<Option>,
): {
  options: Array<OptionEntry>,
  command: ?Command,
  parameters: Array<any>,
  rawParameters: Array<any>,
} {
  let parsedParameters = []
  const rawParameters = []
  const parsedOptions = []

  let lastOption: ?OptionEntry = null
  const argv = given.slice(2)
  for (let i = 0; i < argv.length; i++) {
    const chunk = argv[i]
    if (chunk === '--') {
      parsedParameters = parsedParameters.concat(argv.slice(i + 1))
      break
    }
    if (chunk.startsWith('-')) {
      if (lastOption) {
        if (lastOption.option.parameter && !lastOption.value) {
          throw generateError(`Option ${chunk} expects a value`, rawParameters)
        }
        parsedOptions.push(lastOption)
        lastOption = null
      }
      if (OPTION_SHORT_MULTI.test(chunk)) {
        // Expand -asd to -a -s -d in argv
        const matched = OPTION_SHORT_MULTI.exec(chunk)
        argv.splice(i, 1, ...matched[1].split('').map(e => `-${e}`))
        i--
        continue
      }
      if (OPTION_COMPRESSED.test(chunk)) {
        // Expand --bee=sea / -a=b to [--bee, sea]
        const matched = OPTION_COMPRESSED.exec(chunk)
        argv.splice(i, 1, matched[1] || matched[3], matched[2] || matched[4])
        i--
        continue
      }
      lastOption = {
        name: chunk,
        value: null,
        option: getOptionByAlias(options, chunk, rawParameters),
      }
    } else {
      if (!lastOption) {
        rawParameters.push(chunk)
        continue
      }
      if (lastOption.option.parameter && !lastOption.value) {
        lastOption.value = chunk
        parsedOptions.push(lastOption)
        lastOption = null
      } else {
        rawParameters.push(chunk)
      }
    }
  }

  if (lastOption) {
    if (lastOption.option.parameter && !lastOption.value) {
      throw generateError(`Option ${lastOption.name} expects a value`, rawParameters)
    }
    parsedOptions.push(lastOption)
  }

  let command = null
  for (let i = rawParameters.length; i--; ) {
    const currentName = rawParameters.slice(0, i + 1).join('.')
    command = commands.find(entry => entry.name === currentName)
    if (command) {
      parsedParameters.unshift(...rawParameters.slice(i + 1))
      break
    }
  }

  if (command) {
    let notEnough = false
    const availableParameters = parsedParameters.slice()
    parsedParameters = []
    for (let i = 0, { length } = command.parameters; i < length; i++) {
      const parameter = command.parameters[i]
      const value = availableParameters.shift()
      if (!value && parameter.type.startsWith('required')) {
        notEnough = true
        break
      } else if (parameter.type.endsWith('variadic')) {
        parsedParameters.push((value ? [value] : []).concat(availableParameters.slice()))
        availableParameters.length = 0
        break
      } else if (value) {
        parsedParameters.push(value)
      }
    }
    // Do not throw these errors when user asks --help
    if (!parsedOptions.some(o => o.option.aliases.indexOf('--help') !== -1)) {
      if (notEnough) {
        throw generateError(`Not enough parameters for command: ${command.name.split('.').join(' ')}`, rawParameters)
      } else if (availableParameters.length) {
        throw generateError(`Too many parameters for command: ${command.name.split('.').join(' ')}`, rawParameters)
      }
    }
  } else parsedParameters.unshift(...rawParameters)

  // Process the bool options and fill defaults
  for (let i = 0, { length } = parsedOptions; i < length; i++) {
    const entry = parsedOptions[i]
    if (!entry.option.parameter) {
      entry.value = true
    }
  }

  // Add defaults
  const validationPrefix = rawParameters.join('.')
  options.forEach(function(option) {
    if (parsedOptions.find(e => e.option === option)) {
      return
    }
    if (option.command && validationPrefix.indexOf(option.command) !== 0) {
      return
    }

    let { defaultValue } = option
    if (defaultValue === null) {
      if (option.parameter) {
        defaultValue = option.parameter.type.endsWith('variadic') ? [] : ''
      } else defaultValue = false
    }
    parsedOptions.push({
      option,
      name: '',
      value: defaultValue,
    })
  })

  return {
    options: parsedOptions,
    command,
    parameters: parsedParameters,
    rawParameters,
  }
}
