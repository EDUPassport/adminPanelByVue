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

export function getSubIdentity(params) {
  return request({
    url: '/admin/getSubIdentity',
    method: 'get',
    params
  })
}

export function addSubIdentity(data) {
  return request({
    url: '/admin/addSubIdentity',
    method: 'post',
    data
  })
}

export function addMenuForAdminUser(data) {
  return request({
    url: '/admin/function/menu/add',
    method: 'post',
    data
  })
}

export function getAdminUserMenuList(params) {
  return request({
    url: '/admin/function/menu/list',
    method: 'get',
    params
  })
}

