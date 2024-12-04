import axios from 'axios'

const request = axios.create({
  baseURL: '/api', // 这里的 baseURL 会被 `proxyTable` 中的配置转发
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 生成 requestID
  const requestID = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  // 添加 requestID 到请求头
  config.headers['requestID'] = requestID
  return config
}, (error) => {
  return Promise.reject(error)
})

export default request
