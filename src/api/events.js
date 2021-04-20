import request from '@/utils/request'

export function eventsList(params) {
  return request({
    url: '/admin/eventList',
    method: 'get',
    params
  })
}

export function approveEvent(data) {
  return request({
    url: 'admin/approveEvent',
    method: 'post',
    data
  })
}
// /admin/addEvent
export function addEvent(data) {
  return request({
    url: 'admin/addEvent',
    method: 'post',
    data
  })
}
