import request from '@/utils/request'

export function uploadByAliOSS(data) {
  return request({
    url: '/user/uploadImg',
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

// export function uploadByService(params) {
//   return request({
//     url: '/admin/function/menu/list',
//     method: 'get',
//     params
//   })
// }

