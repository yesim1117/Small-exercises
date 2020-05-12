function jsonp (options) {
  // 动态创建script标签
  let oScript = document.createElement('script')
  let params = ''
  for (const attr in options.data) {
    if (object.hasOwnProperty(key)) {
      params += `&${attr}=${options.data[attr]}`
    }
  }
  let fnName = `myJsonp${Math.random().toString().replace('.', '')}`
  window[fnName] = options.success
  // 给script标签添加src属性
  oScript.src = `${options.url}?callback${fnName}`
  // 将script标签追加到页面中
  document.body.appendChild(oScript)
  oScript.onload = function () {
    // 将请求完成的script标签移除
    document.body.removeChild(oScript)
  }
}
export default jsonp