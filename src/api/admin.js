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

export function getSixLogo(params) {
  return request({
    url: '/admin/getSixLogo',
    method: 'get',
    params
  })
}
export function addSixLogo(data) {
  return request({
    url: '/admin/addSixLogo',
    method: 'post',
    data
  })
}

//admin/subscribeEmailList
export function subscribeEmailList(params) {
  return request({
    url: '/admin/subscribeEmailList',
    method: 'get',
    params
  })
}

export function promoCardUserList(params) {
  return request({
    url: '/admin/promoCardUserList',
    method: 'get',
    params
  })
}

export function addVipLevel(data) {
  return request({
    url: '/admin/addVipLevel',
    method: 'post',
    data
  })
}

export function adminExportBusiness(params) {
  return request({
    url: '/admin/export/business',
    method: 'get',
    params
  })
}

export function adminExportVendor(params) {
  return request({
    url: '/admin/export/vendor',
    method: 'get',
    params
  })
}
