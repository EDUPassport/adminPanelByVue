import request from '@/utils/request'


export function Listing(params) {
    return request({
        url: '/admin/insightListing',
        method: 'post',
        params
    })
}


export function delRecord(data) {
    return request({
        url: '/admin/deleteInsightListing',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/admin/updateInsight',
        method: 'post',
        data
    })
}