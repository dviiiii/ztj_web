import axios from 'axios'
import store from '@/store'
import { getToken,cleanToken } from '@/libs/util'
import router from '@/router/index'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      const token = getToken()
      if(token){
        config.headers['x-access-token'] = token;
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      console.log(status)
      return { data, status }
    }, error => {
      this.destroy(url)
      const errData = error.response;
      const status = error.response.status;

      if(status === 401) {
        cleanToken();
        errData.tipsType = 1;
        router.push({
          name: 'login'
        })
      }else if(status === 409) {
        errData.tipsType = 0;
      }
      // addErrorLog(errData)
      return Promise.reject(errData)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
