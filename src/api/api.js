import axios from '@/libs/api.request'

const api = {
  /******************      login模块          *****************************/
  // 用户登录
  login: data => { return axios.request({ url: 'ol/login/', data, method: 'post' }) },
  // 获取用户信息
  getUserInfo: data => { return axios.request({ url: 'ol/userinfo/',data, method: 'get' }) },
  /******************      login模块  end        *****************************/

  /******************      book模块          *****************************/
  // 增加书籍
  addBook: data => { return axios.request({ url: 'ol/book/addbook', data, method: 'post' }) },
  // 获取书籍信息
  getBookList: data => { return axios.request({ url: 'ol/book/booklist', data, method: 'get' }) },
  // 增加阅读记录
  addReading: data => { return axios.request({ url: 'ol/book/addreadinfo', data, method: 'post' }) },
  // 删除图书
  deleteBook: data => { return axios.request({ url: 'ol/book/deletebook', data, method: 'post' }) },
  // 获取复习信息
  getReviewInfo: data => { return axios.request({ url: 'ol/book/getreviewinfo', data, method: 'get' }) },
  // 确认已复习
  checkReview: data => { return axios.request({ url: 'ol/book/checkreview', data, method: 'post' }) },
  // 获取读书明细
  getProgessInfo: data => { return axios.request({ url: 'ol/book/getprogessinfo', data, method: 'post' }) },
  /******************      book模块   end       *****************************/

  /******************      ol模块          *****************************/
  // 查询积分
  getRank: data => { return axios.request({ url: '/ol/rank/getrank', data, method: 'get' }) },
  // 更新积分
  updateRank: data => { return axios.request({ url: '/ol/updateRank', data, method: 'post' }) },

  /******************      ol模块    end      *****************************/

  addTask: data => { return axios.request({ url: '/ol/task/addtask', data, method: 'post' }) },
  queryTask: data => { return axios.request({ url: '/ol/task/querytask', data, method: 'post' }) },
}
export default api
