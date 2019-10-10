import React, {Component} from 'react'
import styles from './style.scss'
import {CSSTransition} from 'react-transition-group'
const prefix = 'adi-pop-'
export default class Pop extends Component {
  render() {
    const {children, state, close} = this.props
    return (
      <div className={`${prefix}root`}>
        <CSSTransition
          in={state}
          timeout={300}
          classNames={`${prefix}up`}
          unmountOnExit
        >
          <div className={`${prefix}main`}>
            <div className={`${prefix}close`} onClick={close} />
            {children}</div>
        </CSSTransition>
        <CSSTransition
          in={state}
          timeout={300}
          classNames={`${prefix}fade`}
          unmountOnExit
        >
          <div className={`${prefix}texture`} onClick={close} />
        </CSSTransition>
      </div>
    )
  }
}
