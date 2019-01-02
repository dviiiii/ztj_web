import axios from '@/libs/api.request'

const api = {
  // 增加数据库实例
  addConfig: data => { return axios.request({ url: '/hqdba/addConfig', data, method: 'post' }) },
  // 查询数据库实例
  queryConfig: data => { return axios.request({ url: '/hqdba/queryConfig', data, method: 'post' }) },
  // 删除数据库实例
  removeConfig: data => { return axios.request({ url: '/hqdba/removeConfig', data, method: 'post' }) },
  // 查询选择的实例中所有的表
  queryAllTables: data => { return axios.request({ url: '/hqdba/queryAllTables', data, method: 'post' }) },
  // 查询选择的实例中所有的表
  queryOneTableCol: data => { return axios.request({ url: '/hqdba/queryOneTableCol', data, method: 'post' }) },
  // 根据表名查询表数据
  queryOneTable: data => { return axios.request({ url: '/hqdba/queryOneTable', data, method: 'post' }) },
  // 简单脱敏
  toMasking: data => { return axios.request({ url: '/hqdba/toMasking', data, method: 'post' }) },

  // NC财务脱敏
  other_mask_01: data => { return axios.request({ url: '/hqdba/other_mask_01', data, method: 'post' }) },

  // 增加书籍
  addBook: data => { return axios.request({ url: '/online/book/addBook', data, method: 'post' }) }
}
export default api
