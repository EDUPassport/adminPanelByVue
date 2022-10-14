import request from '@/utils/request'

export function uploadByAliOSS(data) {
  return request({
    url: '/admin/upload',
    method: 'post',
    data
  })
}

export function uploadByService(data) {
  return request({
    url: '/home/upload/storage',
    method: 'post',
    data
  })
}

