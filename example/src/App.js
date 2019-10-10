import React, {Component} from 'react'
import AddressInput from 'address-input'

export default class App extends Component {
  componentDidMount() {
    this.iframe = window.location.href.match(/iframe/)
    if(this.iframe)this.connection = window.Penpal.connectToParent();
  }

  submitData(info) {
    if(!this.iframe) return
    this.connection.promise.then(parent => {
      parent.getAddressInfo(info)
    });
  }

  render() {
    return (
      <div>
        <AddressInput submit={(info) => this.submitData(info)} style={{padding: '20px 0'}}/>
      </div>
    )
  }
}



