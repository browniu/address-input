import React, {Component} from 'react'
import AddressInput from 'address-input'
import connectToParent from 'penpal/lib/connectToParent';

export default class App extends Component {
  componentDidMount() {
    this.connection = connectToParent();
  }

  submitData(info) {
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
