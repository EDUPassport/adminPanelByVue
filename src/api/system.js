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

export function addSystemTag(data) {
  return request({
    url: '/admin/addSystemTag',
    method: 'post',
    data
  })
}

export function tagList(params) {
  return request({
    url: '/admin/tagList',
    method: 'get',
    params
  })
}

export function tagInfo(params) {
  return request({
    url: '/admin/tagInfo',
    method: 'get',
    params
  })
}

