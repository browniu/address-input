# AddressInput

> 

[![NPM](https://img.shields.io/npm/v/test.svg)](https://www.npmjs.com/package/address-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## demo
[查看示例](https://browniu.github.io/address/)
## Install

```bash
npm install --save address-input
```

## Usage
```html
// public/index.html
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=appAK"></script>
```
```jsx
import React, { Component } from 'react'

import AddressInput from 'address-input'

class Example extends Component {
  render () {
    return (
      <AddressInput />
    )
  }
}
```

## API

| 接口        | 描述                 | 默认值                                                       |
| ----------- | -------------------- | ------------------------------------------------------------ |
| submit      | 返回地址数据         | [省,市,区,详细,地点]                                         |
| style       | 输入框样式           | {font-size:'24px'}                                           |
| placeHolder | 输入框默认值及其样式 | {style:{color:'#666'},value:['省市区','详细地址（精确到门牌号）']} |

## Update

* 20191007 发布第一版

## License

MIT © [github.com/browniu](https://github.com/github.com/browniu)
