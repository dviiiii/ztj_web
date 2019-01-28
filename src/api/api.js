import axios from '@/libs/api.request'

const api = {
  // 用户登录
  login: data => { return axios.request({ url: '/login', data, method: 'post' }) },
  // 获取用户信息
  getUserInfo: data => { return axios.request({ url: '/userInfo',data, method: 'get' }) },
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

  // NC财务脱敏--查询脱敏数据总条数
  mask_01_queryNum: data => { return axios.request({ url: '/hqdba/mask_01_queryNum', data, method: 'post' }) },
  // NC财务脱敏
  mask_01_toMasking: data => { return axios.request({ url: '/hqdba/mask_01_toMasking', data, method: 'post' }) },

  // 增加书籍
  addBook: data => { return axios.request({ url: '/online/book/addBook', data, method: 'post' }) }
}
export default api
