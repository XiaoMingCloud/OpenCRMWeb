
import request from '@/utils/request'

/**
 * 通过批次ID删除文件
 */
export function adminFileDeleteByBatchIdAPI(data) {
  return request({
    url: 'adminFile/deleteByBatchId',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 通过ID删除文件
 */
export function adminFileDeleteByIdAPI(id) {
  return request({
    url: `adminFile/deleteById/${id}`,
    method: 'post'
  })
}

/**
 * 下载文件接口
 */
export function adminFileDownAPI(id) {
  return request({
    url: `adminFile/down/${id}`,
    method: 'post',
    responseType: 'blob'
  })
}

/**
 * 通过adminFile/down/${id}下载文件接口
 * 后期使用 暂用 downloadFileAPI
 */
export function adminFileDownByUrlAPI(url) {
  return request({
    url: url,
    method: 'post',
    responseType: 'blob'
  })
}

/**
 * 通过ID查询文件
 */
export function adminFileQueryByIdAPI(id) {
  return request({
    url: `adminFile/queryById/${id}`,
    method: 'post'
  })
}

/**
 * 通过批次ID查询文件列表
 */
export function adminFileQueryFileListAPI(id) {
  return request({
    url: `adminFile/queryFileList/${id}`,
    method: 'post'
  })
}

/**
 * 通过批次ID查询单个文件
 */
export function adminFileQueryOneByBatchIdAPI(id) {
  return request({
    url: `adminFile/queryOneByBatchId/${id}`,
    method: 'post'
  })
}

/**
 * 修改附件名称
 * @param {*} data
 */
export function adminFileRenameFileAPI(data) {
  return request({
    url: 'adminFile/renameFileById',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 上传文件
 */
export function adminFileUploadAPI(data) {
  var param = new FormData()
  Object.keys(data).forEach(key => {
    param.append(key, data[key])
  })
  return request({
    url: 'adminFile/upload',
    method: 'post',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
