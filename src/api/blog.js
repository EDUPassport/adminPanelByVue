import request from '@/utils/request'

export function addBlogCategory(data) {
  return request({
    url: '/admin/addBlogCategory',
    method: 'post',
    data
  })
}

export function blogCategoryList(params) {
  return request({
    url: '/admin/blogCategoryList',
    method: 'get',
    params
  })
}
export function addBlog(data) {
  return request({
    url: '/admin/addBlog',
    method: 'post',
    data
  })
}
export function addBlogBanner(data) {
  return request({
    url: '/admin/addBlogBanner',
    method: 'post',
    data
  })
}

export function blogList(params) {
  return request({
    url: '/admin/blogList',
    method: 'get',
    params
  })
}

export function blogDetail(params) {
  return request({
    url: '/home/blog',
    method: 'get',
    params
  })
}
