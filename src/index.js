import React, {Component} from 'react'
import './index.scss'
import Form from './pages/form'

export default class ExampleComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {submit} = this.props
    return (<Form submit={(addressInfo) => submit(addressInfo)}/>)
  }
}
