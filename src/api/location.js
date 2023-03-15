import request from '@/utils/request'

export function getAreas(params) {
  return request({
    url: '/getAreas',
    method: 'get',
    params
  })
}

export function getCountry(params) {
  return request({
    url: '/getCountry',
    method: 'get',
    params
  })
}
