import axios from '@/libs/api.request'

const api = {
  //增加数据库实例
  addConfig: data => { return axios.request({ url: '/hqdba/addConfig', data, method: 'post'})},
  //查询数据库实例
  queryConfig: data => { return axios.request({ url: '/hqdba/queryConfig', data, method: 'post'})},
}
export default api
