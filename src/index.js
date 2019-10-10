import React, {Component} from 'react'
import Pop from './components/pop'
import Area from './components/area'
import Detail from './components/detail'
import styles from './style.scss'
import cx from 'classnames'
import './index.scss'
const prefix = 'address-form-'
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

  componentWillMount() {
    this.bMapInit()
  }

  bMapInit() {
    const bMapScript = document.createElement('script')
    bMapScript.setAttribute('type', 'text/javascript')
    bMapScript.setAttribute('src', `https://api.map.baidu.com/api?v=2.0&ak=${this.props.appKey || 'BeepMa92yxGRYYsVsU70gIbvWlkalGR7'}&callback=initialize`)
    document.querySelector('head').appendChild(bMapScript)
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

  closePop() {
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
      <div className={`${prefix}root`}>
        <div className={`${prefix}main`}>
          <div className={`${prefix}inputGroup`} onClick={() => this.clickAreaInput()}>
            <p style={style} className={`${prefix}input`}>{areaInputValue || <span>省-市-区</span>}</p>
          </div>
          <div className={`${prefix}inputGroup`} onClick={() => this.clickDetailInput()}>
            <p style={style} className={`${prefix}input`}>{detailInputValue || <span>详细地址（精确到门牌号）</span>}</p>
          </div>
        </div>
        <Pop state={isAddressArea || isAddressDetail} close={() => this.closePop()}>
          {isAddressArea && <Area defaultValue={areaData} submit={(data) => this.areaSubmit(data)}/>}
          {isAddressDetail &&
          <Detail areaValue={areaInputValue.split(' ')} defaultValue={detailInputValue}
                  submit={(data) => this.detailSubmit(data)}/>}
        </Pop>
      </div>
    )
  }
}
