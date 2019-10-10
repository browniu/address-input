# AddressInput

> 

[![NPM](https://img.shields.io/npm/v/test.svg)](https://www.npmjs.com/package/address-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## [demo](https://browniu.github.io/address/)
## Install

```bash
npm install --save address-input
```

## 组件方式调用

```jsx
import React, { Component } from 'react'

import AddressInput from 'address-input'

class Example extends Component {
  render () {
    return (
       <AddressInput submit={(info) => this.submitData(info)} style={{padding: '20px 0'}}/>
    )
  }
}
```

## iframe方式调用
使用iframe方式调用具有更好的兼容性和隔离性，需要调用组件的项目需要做以下配置

```bash
npm install penpal --save
```

```JavaScript
import connectToChild from 'penpal/lib/connectToChild';

const iframe = document.createElement('iframe');
iframe.src = 'https://browniu.github.io/address-input/?iframe';
document.body.appendChild(iframe);

const connection = Penpal.connectToChild({
  iframe, methods: {
    getAddressInfo:(info)=> console.log('addressInfo:',info)
  }
});
```
>[实例](https://github.com/browniu/address-input/blob/master/iframeTest/index.html)

## API

| 接口        | 描述                 | 默认值                                                       |
| ----------- | -------------------- | ------------------------------------------------------------ |
| appKey      | 百度地图API密匙         | [百度地图开放平台获取](http://lbsyun.baidu.com/apiconsole/key?application=key) |
| submit      | 返回地址数据         | [省,市,区,详细,地点]                                         |
| style       | 输入框样式           | {font-size:'24px'}                                           |
| placeHolder | 输入框默认值及其样式 | {style:{color:'#666'},value:['省市区','详细地址（精确到门牌号）']} |



## Update
* 20191009 提供iframe调用方式
* 20191008 异步加载API框架
* 20191007 发布第一版


## License

MIT © [github.com/browniu](https://github.com/github.com/browniu)



