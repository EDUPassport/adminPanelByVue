import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/admin/userList',
    method: 'get',
    params
  })
}


export function editUserInfo(data) {
  return request({
    url: '/admin/editUserInfo',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/admin/kickedOut',
    method: 'post',
    data
  })
}

export function vipList(params) {
  return request({
    url: '/admin/vipList',
    method: 'get',
    params
  })
}

// admin/changeVipLevel
export function changeVipLevel(data) {
  return request({
    url: '/admin/changeVipLevel',
    method: 'post',
    data
  })
}

// admin/userObjectList

export function userObjectList(params) {
  return request({
    url: '/admin/userObjectList',
    method: 'get',
    params
  })
}

export function vendorList(params) {
  return request({
    url: '/admin/verdorList',
    method: 'get',
    params
  })
}

export function educatorList(params) {
  return request({
    url: '/admin/educatorList',
    method: 'get',
    params
  })
}

export function businessList(params) {
  return request({
    url: '/admin/businessList',
    method: 'get',
    params
  })
}

export function addVendorBasic(data) {
  return request({
    url: '/admin/addVendorBasic',
    method: 'post',
    data
  })
}

export function userInfo(params) {
  return request({
    url: '/admin/userInfo',
    method: 'get',
    params
  })
}

export function addBusinessBasic(data) {
  return request({
    url: '/admin/addBusinessBasic',
    method: 'post',
    data
  })
}

export function addEduBasic(data) {
  return request({
    url: '/admin/addEduBasic',
    method: 'post',
    data
  })
}

export function addProfile(data) {
  return request({
    url: '/admin/user/addProfile',
    method: 'post',
    data
  })
}

export function addUserWork(data) {
  return request({
    url: '/admin/addUserWork',
    method: 'post',
    data
  })
}

export function addUserEducation(data) {
  return request({
    url: '/admin/addUserEducation',
    method: 'post',
    data
  })
}

export function subCateList(params) {
  return request({
    url: '/weixin/subCateList',
    method: 'get',
    params
  })
}

export function subCateLists(params) {
  return request({
    url: '/weixin/subCateLists',
    method: 'get',
    params
  })
}

export function addUserImg(data) {
  return request({
    url: '/admin/addUserImg',
    method: 'post',
    data
  })
}

export function assignAccount(data) {
  return request({
    url: '/admin/assignAccount',
    method: 'post',
    data
  })
}

export function changeBindPhone(data) {
  return request({
    url: '/admin/changeBindPhone',
    method: 'post',
    data
  })
}

export function unbindAccount(data) {
  return request({
    url: '/admin/unbindAccount',
    method: 'post',
    data
  })
}


export function setVipDiscount(data) {
  return request({
    url: '/admin/vip/discount',
    method: 'post',
    data
  })
}

// 2.0 版本的api

export function userContactList(params) {
  return request({
    url: '/admin/user/contact/list',
    method: 'get',
    params
  })
}

export function educatorContactList(params) {
  return request({
    url: '/admin/educator/contact/list',
    method: 'get',
    params
  })
}

export function recruiterList(params) {
  return request({
    url: '/admin/recruiting/list',
    method: 'get',
    params
  })
}

export function schoolList(params) {
  return request({
    url: '/admin/school/list',
    method: 'get',
    params
  })
}

export function otherList(params) {
  return request({
    url: '/admin/other/list',
    method: 'get',
    params
  })
}

export function vendorListV2(params) {
  return request({
    url: '/admin/vendor/list',
    method: 'get',
    params
  })
}
