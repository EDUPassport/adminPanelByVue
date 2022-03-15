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
export function myAds(params){
  return request({
    url:'/admin/myAds',
    method:'get',
    params
  })
}

export function setUserAds(data) {
  return request({
    url: '/admin/setUserAds',
    method: 'post',
    data
  })
}

export function approveAdList(params){
  return request({
    url:'/admin/approveAdList',
    method:'get',
    params
  })
}

export function approveAds(data) {
  return request({
    url: '/admin/approveAds',
    method: 'post',
    data
  })
}

export function buyAd(data) {
  return request({
    url: '/admin/buyAd',
    method: 'post',
    data
  })
}

export function setAdsCategoryDiscount(data) {
  return request({
    url: '/admin/adCategory/discount',
    method: 'post',
    data
  })
}
