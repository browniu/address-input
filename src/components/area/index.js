import React, {Component} from 'react'
import styles from './style.scss'
import cx from 'classnames'
import defaultData from './data'
const prefix = 'adi-area-'
const data = JSON.parse(JSON.parse(JSON.stringify(defaultData())))
export default class Area extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hotIndex: null,
      selectProvince: {},
      selectCity: {},
      selectArea: {},
      panelList: [],
      panelLevel: 0
    }
  }

  selectHot(index, item) {
    this.setState({
      hotIndex: index,
      selectProvince: item.province,
      selectCity: item.city,
      selectArea: {},
      panelList: data[item.city.number],
      panelLevel: 2
    })
  };

  renderHot() {
    const hotData = [
      {label: '北京', province: {name: '北京', number: 110000}, city: {name: '市辖区', number: 110100}},
      {label: '上海', province: {name: '上海', number: 310000}, city: {name: '市辖区', number: 310100}},
      {label: '广州', province: {name: '广东', number: 440000}, city: {name: '广州', number: 440100}},
      {label: '深圳', province: {name: '广东', number: 440000}, city: {name: '深圳', number: 440300}},
      {label: '杭州', province: {name: '浙江', number: 330000}, city: {name: '杭州', number: 330100}},
      {label: '武汉', province: {name: '湖北', number: 420000}, city: {name: '武汉', number: 420100}},
      {label: '成都', province: {name: '四川', number: 510000}, city: {name: '成都', number: 510100}},
      {label: '郑州', province: {name: '河南', number: 410000}, city: {name: '郑州', number: 410100}}
    ]
    return (
      <div className={`${prefix}hot`}>
        <div className={`${prefix}itemTitle`}>热门城市</div>
        <div className={`${prefix}items`}>
          {hotData.map((item, index) => (
            <li onClick={() => this.selectHot(index, item)} key={index}
                className={cx(`${prefix}item`, {[styles.act]: index === this.state.hotIndex})}>
              <span>{item.label}</span>
            </li>
          ))}
        </div>
      </div>
    )
  }

  renderPanel() {
    const {selectProvince, selectCity, selectArea} = this.state
    return (
      <div className={`${prefix}panel`}>
        <div className={`${prefix}itemTitle`}>省市区选择</div>
        <div className={`${prefix}panelHeader`} onClick={(e) => this.panelHeaderClick(e)}>
          <li data-level={0} className={cx({act: !selectProvince.name})}>{selectProvince.name}</li>
          <li data-level={1}
              className={cx({act: selectProvince.name && !selectCity.name})}>{selectCity.name}</li>
          <li data-level={2}
              className={cx({act: selectProvince.name && selectCity.name && !selectArea.name})}>{selectArea.name}</li>
        </div>
        <div className={`${prefix}panelMain`}>
          {Object.keys(this.state.panelList).map(item => (
            <li key={item} onClick={() => this.panelItemSelect(item)}>
              <span>{this.state.panelList[item]}</span></li>
          ))}
        </div>
      </div>
    )
  }

  panelHeaderClick(e) {
    const level = e.target.getAttribute('data-level') / 1
    this.setState({panelLevel: level})
    if (level === 0) {
      this.setState({selectProvince: {}, selectCity: {}, selectArea: {}, panelList: data['86']})
    }
    if (level === 1) {
      this.setState({
        selectCity: {},
        selectArea: {},
        panelList: data[this.state.selectProvince.number]
      })
    }
  }

  panelItemSelect(item) {
    if (this.state.panelLevel === 0) {
      const selectItem = {name: data['86'][item], number: item}
      this.setState({selectProvince: selectItem, panelList: data[selectItem.number], panelLevel: 1})
      return
    }
    if (this.state.panelLevel === 1) {
      const selectItem = {name: data[this.state.selectProvince.number][item], number: item}
      if (!data[selectItem.number]) {
        this.setState({selectCity: selectItem})
        this.props.submit({
          province: this.state.selectProvince,
          city: this.state.selectCity,
          area: this.state.selectArea
        })
      } else {
        this.setState({selectCity: selectItem, panelList: data[selectItem.number], panelLevel: 2})
      }

      return
    }
    if (this.state.panelLevel === 2) {
      const selectItem = {name: data[this.state.selectCity.number][item], number: item}
      this.setState({selectArea: selectItem})
      setTimeout(() => {
          this.props.submit({
            province: this.state.selectProvince,
            city: this.state.selectCity,
            area: this.state.selectArea
          }, 50)
        }
      )

    }
  }

  componentDidMount() {
    const {province, city, area} = this.props.defaultValue
    this.setState({panelList: data['86']})
    if (province && city && area) {
      this.setState({
        selectProvince: province,
        selectCity: city,
        panelList: data[city.number],
        panelLevel: 2
      })
    }
  }

  render() {
    return (
      <div className={`${prefix}root`}>
        <div className={`${prefix}header`}>
          <div className={`${prefix}title`}>城市地区选择</div>
          <i className={`${prefix}close`}/>
        </div>
        <div className={`${prefix}main`}>
          {this.renderHot()}
          {this.renderPanel()}
        </div>
      </div>
    )
  }
}
