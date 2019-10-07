import React, {Component} from 'react'
import Poop from './components/poop'
import Area from './components/area'
import Detail from './components/detail'
import styles from './style.scss'
import './index.scss'

export default class ExampleComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddressArea: false,
      isAddressDetail: false,
      areaData: {},
      areaInputValue: '',
      detailInputValue: ''
    }
  }

  clickAreaInput() {
    this.setState({isAddressArea: true})
  }

  clickDetailInput() {
    if (!this.state.areaInputValue) {
      this.clickAreaInput()
      return
    }
    this.setState({isAddressDetail: true})
  }

  closePoop() {
    this.setState({isAddressArea: false, isAddressDetail: false})
  }

  areaSubmit(data) {
    this.setState({
      areaData: data,
      areaInputValue: `${data.province.name} ${data.city.name} ${data.area.name || ''}`,
      isAddressArea: false,
      detailInputValue: ''
    })
  }

  detailSubmit(data) {
    this.setState({
      isAddressDetail: false,
      detailInputValue: `${data[3]} ${data[4] || ''}`
    })
    const {submit} = this.props
    if (submit) submit(data)
  }

  render() {
    const {isAddressArea, isAddressDetail, areaInputValue, detailInputValue, areaData} = this.state
    const {style} = this.props
    return (
      <div className={styles.root}>
        <div className='main'>
          <div className={styles.inputGroup} onClick={() => this.clickAreaInput()}>
            <p style={style} className={styles.input}>{areaInputValue || <span>省市区</span>}</p>
          </div>
          <div className={styles.inputGroup} onClick={() => this.clickDetailInput()}>
            <p style={style} className={styles.input}>{detailInputValue || <span>详细地址（精确到门牌号）</span>}</p>
          </div>
        </div>
        <Poop state={isAddressArea || isAddressDetail} close={() => this.closePoop()}>
          {isAddressArea && <Area defaultValue={areaData} submit={(data) => this.areaSubmit(data)}/>}
          {isAddressDetail &&
          <Detail areaValue={areaInputValue.split(' ')} defaultValue={detailInputValue}
                  submit={(data) => this.detailSubmit(data)}/>}
        </Poop>
      </div>
    )
  }
}
