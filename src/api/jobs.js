import request from '@/utils/request'

export function jobList(params) {
  return request({
    url: '/admin/jobList',
    method: 'get',
    params
  })
}
export function approveJobs(data) {
  return request({
    url: '/admin/approveJobs',
    method: 'post',
    data
  })
}

export function setJobSort(data) {
  return request({
    url: '/admin/setJobSort',
    method: 'post',
    data
  })
}

export function delJobs(data) {
  return request({
    url: '/admin/delJobs',
    method: 'post',
    data
  })
}

export function setJobFeature(data) {
  return request({
    url: '/admin/setJobFeature',
    method: 'post',
    data
  })
}

export function addJobs(data) {
  return request({
    url: '/admin/addjobs',
    method: 'post',
    data
  })
}

export function addJobProfile(data) {
  return request({
    url: '/admin/addProfile',
    method: 'post',
    data
  })
}

export function jobDetail(params) {
  return request({
    url: '/admin/jobDetail',
    method: 'get',
    params
  })
}
export function getServiceList(params) {
  return request({
    url: '/admin/getServiceList',
    method: 'get',
    params
  })
}
export function addServices(data) {
  return request({
    url: '/admin/addServices',
    method: 'post',
    data
  })
}
export function refreshJobs(data) {
  return request({
    url: '/admin/refreshJobs',
    method: 'post',
    data
  })
}
export function uploadExcel(data) {
  return request({
    url: '/admin/upload',
    method: 'post',
    data
  })
}
export function uploadJobs(data) {
  return request({
    url: '/admin/uploadJobs',
    method: 'post',
    data
  })
}
export function getJobResume(params) {
  return request({
    url: '/admin/getJobResume',
    method: 'get',
    params
  })
}

export function userJobList(params){
  return request({
    url: '/admin/userJobList',
    method: 'get',
    params
  })
}

export function setJobServiceDiscount(data) {
  return request({
    url: '/admin/jobService/discount',
    method: 'post',
    data
  })
}
