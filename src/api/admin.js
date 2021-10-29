import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/admin/logout',
    method: 'post',
    data
  })
}

export function indexCount(params) {
  return request({
    url: '/admin/index',
    method: 'get',
    params
  })
}

export function categoryList(params) {
  return request({
    url: '/admin/getObjectList',
    method: 'get',
    params
  })
}

export function updateObject(data) {
  return request({
    url: '/admin/updateObject',
    method: 'post',
    data
  })
}


export function addUserObject(data) {
  return request({
    url: '/admin/addUserObject',
    method: 'post',
    data
  })
}

export function addAdminUser(data) {
  return request({
    url: '/admin/addAdminUser',
    method: 'post',
    data
  })
}

export function getAdminList(params) {
  return request({
    url: '/admin/getAdminList',
    method: 'get',
    params
  })

}

export function addPromoCode(data) {
  return request({
    url: '/admin/addPromoCode',
    method: 'post',
    data
  })
}

export function approveBusiness(data) {
  return request({
    url: '/admin/approveBusiness',
    method: 'post',
    data
  })
}

export function promoCardList(params) {
  return request({
    url: '/admin/promoCardList',
    method: 'get',
    params
  })
}

export function setFeaturedDeals(data) {
  return request({
    url: '/admin/setFeaturedDeals',
    method: 'post',
    data
  })
}
