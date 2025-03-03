const getLocationOrigin = () => {
  return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
}

const companyName = 'OpenCRM'
const version = 'V1.0.1'
const baiduKey = '百度key'

export default {
  version,
  companyName,
  getLocationOrigin,
  baiduKey
}
