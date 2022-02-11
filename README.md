# Node JSSignature

## 说明

本 js 库为 [laravel-signature](https://packagist.org/packages/seffeng/laravel-signature) 的客户端 js 版本。

## 安装

```shell
$ npm install js-signature
```

## 使用

```javascript
# 1、设置 key，secret,[uri, method, params, ...]  参数；
# 2、通过 sign() 方法签名；
# 3、通过 getHeaders() 获取头部需要携带的参数，通过 http 请求头传递。
```

```vue
<script>
import JSSignature from 'js-signature'

JSSignature.init({
    key: 'accessKeyId',
    secret: 'accessKeySecret'
})
// uri，method, params, 也可直接通过 init 设置
const headers = JSSignature.setUri('/index').setMethod('GET')
        .setParams({ perPage: 20, page: 1, a: { aa: '1', bb: '2' }}).sign().getHeaders()
console.log(headers)
/**
* 因传递的时间为浏览器端的时间，可能错误；可提示时间错误或通过不签名接口获取服务器时间再使用设置时间戳方法
const headers = JSSignature.setUri('/index').setMethod('GET').setTimesamp(1600246526)
        .setParams({ perPage: 20, page: 1, a: { aa: '1', bb: '2' }}).sign().getHeaders()
*/
// {Access-Key-Id: "accessKeyId", Timestamp: "1600246526", Signature: "Signature B7vSXHICVTYYuGC5w3vBVdCwgjQ=", Version: ""}
</script>
```

## init参数

| 参数               | 类型   | 默认          | 说明                                               |
| ------------------ | ------ | ------------- | -------------------------------------------------- |
| key                | string | ''            | 必须，accessKeyId                                  |
| secret             | string | ''            | 必须，accessKeySecret                              |
| method             | string | GET           | [GET, POST, PUT, DELETE, ...]                      |
| uri                | string | '/'           | 请求URI，域名后/开始                               |
| params             | object | {}            | 参数，                                             |
| version            | string | ''            | 接口版本                                           |
| algo               | string | sha1          | 加密方式[md5, sha1, sha256, ...]                   |
| prefix             | string | ''            | 签名字符串前面拼接的字符                           |
| connector          | string | &             | 签名字符串之间拼接的字符                           |
| suffix             | string | ''            | 签名字符串最后拼接的字符                           |
| headerAccessKey    | string | Access-Key-Id | 请求头参数名，headers['Access-Key-Id']             |
| headerTimestamp    | string | Timestamp     | 请求头参数名，headers['Timestamp]                  |
| headerSignature    | string | Signature     | 请求头参数名，headers['Signature']                 |
| headerSignatureTag | string | Signature     | 签名标识 headers['Signature'] = Signature __sign__ |
| headerVersion      | string | Version       | 请求头参数名，headers['Version']                   |

## 方法（主要使用init, sign, getHeaders）

| 方法                          | 可通过init()方法设置   | 说明                    |
| ----------------------------- | ---------------------- | ----------------------- |
| init(object)                  | -                      | 设置参数值              |
| setMethod(string)             | 是                     | 设置 method             |
| setUri(string)                | 是                     | 设置 uri                |
| setParams(object)             | 是                     | 设置 params             |
| sign()                        | -                      | 签名                    |
| getHeaders()                  | -                      | 获取头部数据            |
| setTimesamp(number)           | -                      | 设置时间戳              |
| setKey(string)                | 是                     | 设置 accessKeyId        |
| setSecret(string)             | 是                     | 设置 accessKeySecret    |
| setVersion(string)            | 是                     | 设置 version            |
| setAlgo(string)               | 是                     | 设置 algo               |
| setPrefix(string)             | 是                     | 设置 prefix             |
| setConnector(string)          | 是                     | 设置 connector          |
| setSuffix(string)             | 是                     | 设置 suffix             |
| setHeaderAccessKey(string)    | 是                     | 设置 headerAccessKey    |
| setHeaderTimestamp(string)    | 是                     | 设置 headerTimestamp    |
| setHeaderSignature(string)    | 是                     | 设置 headerSignature    |
| setHeaderSignatureTag(string) | 是                     | 设置 headerSignatureTag |
| setHeaderVersion(string)      | 是                     | 设置 headerVersion      |

## 注意

```shell
# 注意：
# 1、因传递的时间为浏览器端的时间，可能错误；可提示时间错误或通过不签名接口获取服务器时间再使用设置时间戳方法
```

