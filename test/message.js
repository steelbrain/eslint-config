// @flow
// from: https://github.com/steelbrain/linter-ui-default/blob/d7983647db386d6412c8178f49a0ab15deb85287/lib/tooltip/message.js

import * as url from 'url'
import React from 'react'

import { openFile, applySolution, getActiveTextEditor, sortSolutions } from '../helpers'
import type TooltipDelegate from './delegate'
import type { Message, LinterMessage } from '../types'
import FixButton from './fix-button'

function findHref(givenEl: ?Element): ?string {
  let el = givenEl
  while (el && !el.classList.contains('linter-line')) {
    if (el instanceof HTMLAnchorElement) {
      return el.href
    }
    el = el.parentElement
  }
  return null
}

type Props = {
  message: Message,
  delegate: TooltipDelegate,
}

type State = {
  description?: string,
  descriptionShow?: boolean,
}

class MessageElement extends React.Component<Props, State> {
  state: State = {
    descriptionShow: false,
  }

  componentDidMount() {
    this.props.delegate.onShouldUpdate(() => {
      this.setState({})
    })
    this.props.delegate.onShouldExpand(() => {
      if (!this.state.descriptionShow) {
        this.toggleDescription()
      }
    })
    this.props.delegate.onShouldCollapse(() => {
      if (this.state.descriptionShow) {
        this.toggleDescription()
      }
    })
  }

  // NOTE: Only handling messages v2 because v1 would be handled by message-legacy component
  onFixClick(): void {
    const { message } = this.props
    const textEditor = getActiveTextEditor()
    if (message.version === 2 && message.solutions && message.solutions.length) {
      applySolution(textEditor, message.version, sortSolutions(message.solutions)[0])
    }
  }

  openFile = (ev: Event) => {
    if (!(ev.target instanceof HTMLElement)) {
      return
    }
    const href = findHref(ev.target)
    if (!href) {
      return
    }
    // parse the link. e.g. atom://linter?file=<path>&row=<number>&column=<number>
    const { protocol, hostname, query } = url.parse(href, true)
    const file = query && query.file
    if (protocol !== 'atom:' || hostname !== 'linter' || !file) {
      return
    }
    const row = query && query.row ? parseInt(query.row, 10) : 0
    const column = query && query.column ? parseInt(query.column, 10) : 0
    openFile(file, { row, column })
  }

  canBeFixed(message: LinterMessage): boolean {
    if (message.version === 1 && message.fix) {
      return true
    } else if (message.version === 2 && message.solutions && message.solutions.length) {
      return true
    }
    return false
  }

  props: Props
  descriptionLoading: boolean = false

  render() {
    const { message, delegate } = this.props

    return (
      <linter-message class={message.severity} onClick={this.openFile}>
        {message.description && (
          <span className={`icon linter-icon icon-${this.state.descriptionShow ? 'chevron-down' : 'chevron-right'}`} />
        )}
        <linter-excerpt>
          {this.canBeFixed(message) && <FixButton onClick={() => this.onFixClick()} />}
          {delegate.showProviderName ? `${message.linterName}: ` : ''}
          {message.excerpt}
        </linter-excerpt>{' '}
        {message.reference &&
          message.reference.file && (
            <span className="icon linter-icon icon-alignment-aligned-to" />
          )}
        {message.url && (
          <span className="icon linter-icon icon-link" />
        )}
      </linter-message>
    )
  }
}

module.exports = MessageElement
