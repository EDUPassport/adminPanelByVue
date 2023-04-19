import request from "@/utils/request";

export function ADD_DEALS(data) {
  return request({
    url: '/admin/addDeals',
    method: 'post',
    data
  })
}

export function TAG_LIST(params) {
  return request({
    url: '/home/tagList',
    method: 'get',
    params
  })
}
export function GET_COUNTRY_LIST(params) {
  return request({
    url: '/getCountry',
    method: 'get',
    params
  })
}

export function DEAL_DETAIL(params){
  return request({
    url:'/admin/deals/detail',
    method:'get',
    params
  })
}

export function USER_OBJECT_LIST(params) {
  return request({
    url: '/admin/userObjectList',
    method: 'get',
    params
  })
}
export function ADD_JOB(data) {
  return request({
    url: '/admin/addjobs',
    method: 'post',
    data
  })
}

export function JOB_DETAIL(params) {
  return request({
    url: '/admin/jobDetail',
    method: 'get',
    params
  })
}

export function JOB_ADD_PROFILE(data) {
  return request({
    url: '/admin/addProfile',
    method: 'post',
    data
  })
}

export function EVENTS_ADD_EVENT(data) {
  return request({
    url: '/admin/addEvent',
    method: 'post',
    data
  })
}

export function EVENTS_CATEGORY(params) {
  return request({
    url: '/home/eventCategory',
    method: 'get',
    params
  })
}

export function EVENTS_TAGS(params) {
  return request({
    url: '/home/tagList',
    method: 'get',
    params
  })
}

export function UPLOAD_BY_ALI_OSS(data) {
  return request({
    url: '/admin/upload',
    method: 'post',
    data
  })
}

export function UPLOAD_BY_SERVICE(data) {
  return request({
    url: '/home/upload/storage',
    method: 'post',
    data
  })
}

export function EVENT_DETAIL(params){
  return request({
    url: '/admin/event/detail',
    method: 'get',
    params
  })
}

export function USER_ALL_IDENTITY(params){
  return request({
    url: '/admin/user/all/identity',
    method: 'get',
    params
  })
}

//复制School信息到Recruiting
export function SCHOOL_COPY_AS_RECRUITER(data) {
  return request({
    url: '/admin/school/copy/recruiting',
    method: 'post',
    data
  })
}

export function ADMIN_REFRESH_JOBS(params) {
  return request({
    url: '/admin/refresh/jobs',
    method: 'get',
    params
  })
}

export function ADMIN_COUNT_INDEX(params) {
  return request({
    url: '/admin/count/index',
    method: 'get',
    params
  })
}

export function ADD_USER_QUESTION(data) {
  return request({
    url: '/admin/add/user/question',
    method: 'post',
    data
  })
}
