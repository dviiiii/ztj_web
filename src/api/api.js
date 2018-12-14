import axios from '@/libs/api.request'

const api = {
  // 增加数据库实例
  addConfig: data => { return axios.request({ url: '/hqdba/addConfig', data, method: 'post' }) },
  // 查询数据库实例
  queryConfig: data => { return axios.request({ url: '/hqdba/queryConfig', data, method: 'post' }) },
  // 查询选择的实例中所有的表
  queryAllTables: data => { return axios.request({ url: '/hqdba/queryAllTables', data, method: 'post' }) },
  // 查询选择的实例中所有的表
  queryOneTableCol: data => { return axios.request({ url: '/hqdba/queryOneTableCol', data, method: 'post' }) },
  // 根据表名查询表数据
  queryOneTable: data => { return axios.request({ url: '/hqdba/queryOneTable', data, method: 'post' }) },
  // 根据表名查询表数据
  toMasking: data => { return axios.request({ url: '/hqdba/toMasking', data, method: 'post' }) }
}
export default api
