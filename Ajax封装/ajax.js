function ajax (options) {
  // 默认值
  let defaults = {
    type: 'get',
    url: '',
    data: {},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    seccess () {},
    error () {}
  }
  // 使用options对象中的属性覆盖defaults对象中的属性
  // 操作源对象
  Object.assign(defaults, options)
  // 创建ajax对象
  let xhr = new XMLHttpRequest()
  // 拼接请求参数
  let params = ''
  // 循环传递进来的对象格式参数
  for (let attr in defaults.data) {
    // 将参数转换为字符串格式
    params += `${attr}=${defaults.data[attr]}&`
  }
  // 将参数最后的&截取掉
  params = params.substr(0, params.length-1)
  // 判断请求方式
  if (defaults.type == 'get') {
    defaults.url = `${defaults.url}?${params}`
  }
  // 配置ajax对象
  xhr.open(defaults.type, defaults.url)
  if (defaults.type == 'post') {
    // 请求参数的类型
    let contentType = defaults.header['Content-Type']
    // 设置请求参数格式的类型
    xhr.setRequestHeader('Content-Type', defaults.header['Content-Type'])
    // 判断用户希望的请求参数格式类型
    // 如果类型为json
    if (contentType == 'application/json') {
      // 传递json数据格式的参数
      xhr.send(JSON.stringify(defaults.data))
    }else {
      // 发送请求
      xhr.send(params)
    }
  }else {
    // 发送请求
    xhr.send()
  }
  // 监听xhr对象下面的onload事件
  // 当xhr对象接收完响应数据后出发
  xhr.onload = function () {
    // 获取响应头中的数据
    let contentType = xhr.getResponseHeader('Content-Type')
    let responseText = xhr.responseText
    // 如果响应类型中包含app/json
    if (contentType.includes('application/json')) {
      // 将json字符串转换为json对象
      responseText = JSON.parse(responseText)
    }
    // 当http状态码==200的时候
    if (xhr.status == 200) {
      // 请求成功
      defaults.seccess(responseText, xhr)
    }else {
      // 请求失败
      defaults.error(responseText, xhr)
    }
  }
}