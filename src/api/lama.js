import request from '@/utils/request'

export function lamaRankingList(params) {
  return request({
    url: '/admin/getRankingList',
    method: 'get',
    params
  })
}
