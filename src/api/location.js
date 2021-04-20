import request from '@/utils/request'

export function getAreas(params) {
  return request({
    url: '/getAreas',
    method: 'get',
    params
  })
}
