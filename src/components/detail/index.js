import React, {Component} from 'react'
import styles from './style.scss'

export default class AddressEdit extends Component {
  constructor(props) {
    super(props)
    this.inputDom = React.createRef();
    this.state = {
      results: [],
      inputValue: undefined,
      addressData: undefined,
    }
  }

  componentDidMount() {
    this.initMap()
    setTimeout(() => this.initInput(), 50)
  }

  initMap() {
    const {BMap, BMAP_STATUS_SUCCESS} = window
    const map = new BMap.Map('bmap')
    const options = {
      onSearchComplete: result => {
        if (this.local.getStatus() !== BMAP_STATUS_SUCCESS) return
        this.handleResult(result)
      }
    }
    this.local = new BMap.LocalSearch(map, options)
  }

  initInput() {
    const {defaultValue} = this.props
    if (defaultValue) {
      this.inputDom.current.value = defaultValue.split(' ')[0]
    }
  }

  handleResult(result) {
    let list = []
    for (let i = 0; i < result.Ar.length; i++) {
      const item = result.Ar[i]
      if (!item.address.match(/号/)) {
        continue
      } else {
        const {title, address, city, province} = item
        list.push({title, address, city, province})
      }
    }
    this.setState({results: list})
  }

  keywordSearch(word) {
    let address = JSON.parse(JSON.stringify(this.props.areaValue))
    if (address) {
      address.push(word)
      this.local.search(address.join(' '))
    } else {
      this.local.search(word)
    }
  }

  inputChange(e) {
    if (this.timer) clearTimeout(this.timer)
    const value = e.target.value.trim()
    const rule = /^[0-9]/ /*不能以数字开头*/
    if (value && !rule.test(value)) {
      this.timer = setTimeout(() => {
        this.keywordSearch(value)
        this.setState({inputValue: value})
      }, 500) /*截流*/
    }
  }

  selectItem(item) {
    let address = item.address.toString()
    const {areaValue} = this.props
    // 清除区域重复字段
    if (areaValue) {
      areaValue.forEach(item => {
        address = address.replace(`${item}+省`, '')
        address = address.replace(`${item}+市`, '')
      })
    }
    // 清除地址与地点重复字段
    address = address.replace(item.title, '')
    address = areaValue.concat([address, item.title])
    this.inputDom.current.value = `${address[3]} ${address[4] || ''}`
    this.address = address
  }

  submitItem() {
    const {submit} = this.props
    if (this.address) {
      submit(this.address)
    } else {
      let address = this.inputDom.current.value
      const {areaValue} = this.props
      // 清除区域重复字段
      if (areaValue) {
        areaValue.forEach(item => {
          address = address.replace(`${item}+省`, '')
          address = address.replace(`${item}+市`, '')
        })
      }
      address = areaValue.concat([address])
      submit(address)
    }
  }

  render() {
    const {defaultValue,} = this.props
    const {inputValue} = this.state
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.title}>详细地址编辑</div>
          <i className={styles.close}/>
        </div>
        <div className={styles.main}>
          <div className={styles.input}>
                        <textarea
                          rows={1}
                          ref={this.inputDom}
                          placeholder={'请输入详细地址 例：西山居'}
                          onChange={e => this.inputChange(e)}
                        />
            {(inputValue || defaultValue) &&
            <div className={styles.button} onClick={() => this.submitItem()}>确认</div>}
          </div>
          <div className={styles.list}>
            {this.state.results.map((item, index) => (
              <li
                key={index}
                className={styles.item}
                onClick={() => this.selectItem(item)}
              >
                <div className={styles.title}>{item.title}</div>
                <div className={styles.sub}>{item.address}</div>
              </li>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
