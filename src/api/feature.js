import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/admin/addFeature',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/updateFeature',
    method: 'post',
    data
  })
}

export function adList(params) {
  return request({
    url: '/admin/listing',
    method: 'get',
    params
  })
}

export function dealLists(data) {
  return request({
    url: '/admin/dealLists',
    method: 'post',
    data
  })
}

