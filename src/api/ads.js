import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/admin/addAd',
    method: 'post',
    data
  })
}

export function adList(params) {
  return request({
    url: '/admin/adList',
    method: 'get',
    params
  })
}

export function adDetail(params) {
  return request({
    url: '/ad/detail',
    method: 'get',
    params
  })
}

export function adCategoryList(params){
  return request({
    url:'/Admin/adCategoryList',
    method:'get',
    params
  })
}

export function addCategory(data) {
  return request({
    url: '/Admin/addCategory',
    method: 'post',
    data
  })
}
