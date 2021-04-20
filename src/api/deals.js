import request from '@/utils/request'

export function dealsList(params) {
  return request({
    url: '/admin/dealsList',
    method: 'get',
    params
  })
}

export function approveDeal(data) {
  return request({
    url: '/admin/approveDeal',
    method: 'post',
    data
  })
}

// deals/addDeals
export function addDeals(data) {
  return request({
    url: '/admin/addDeals',
    method: 'post',
    data
  })
}
