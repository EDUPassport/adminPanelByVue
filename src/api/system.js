import request from '@/utils/request'

export function addSystem(data) {
  return request({
    url: '/admin/addSystem',
    method: 'post',
    data
  })
}

export function getSystemInfo(params) {
  return request({
    url: '/admin/getSystemInfo',
    method: 'get',
    params
  })
}
